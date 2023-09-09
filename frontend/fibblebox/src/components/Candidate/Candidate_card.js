import Link from "next/link";
import api_url from "../../../fecth_urls";
import ifTimeRemaining from "@/functions/validate_time_left";
import notification_message from "@/functions/message_function";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {useSearchParams} from "next/navigation";


export default function Candidate(props){
    const [voteCoupon, setVoteCoupon] = useState(false);
    const [votingEnded, setVotingEnded] = useState(true);

    function toggleVotingMode(){
        setVoteCoupon(!voteCoupon)
    }

    //console.log(props)

    const votes = useRef(0);
    const votesRef = useRef();
    const emailRef = useRef();
    const couponRef = useRef();

    const updateVotesField = ()=>{
        votesRef.current.value=votes.current
        //console.log(votes.current)
    }
    const increaseVotes = ()=>{
        votes.current = votes.current + 1;
        updateVotesField()
    }
    const decreaseVotes = ()=>{
        if(votes.current >= 1){
            votes.current = votes.current - 1;
            updateVotesField()
        }
        else{
            votes.current = 0;
            updateVotesField()
        }
    }

    const router = useRouter();
    const urlParam = useSearchParams();
  

    let poll = urlParam.get('contest');
    let candidate = urlParam.get('candidate');
    let status = urlParam.get('status');
    let message = urlParam.get('vtes');
    
    const [showMessage, setShowMessage] = useState(false);

    const voteApiCall= async()=>{

        if(votesRef.current.value > 0){
            const body = {'email':emailRef.current.value, 'votes':votesRef.current.value, 'candidate_id':props.id};
    
            const url = '/api/email_vote';
            const option = {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(body)
            }
            const apiRes = await fetch(url,option);
            if(apiRes.status == 200){
            const data = await apiRes.json();
            const contest = urlParam.get('contest')
            const _candidate = urlParam.get('candidate')
            //window.location.replace(`/polls/payment?reference=${data.response_data.reference}&amount=${data.response_data.amount}&votes=${data.response_data.votes}&email=${data.response_data.email}&contest=${contest}&candidate_name=${_candidate}`);
            router.push({
                pathname:'../payment',
                query:{'reference':data.response_data.reference,'amount':data.response_data.amount, 'votes':data.response_data.votes, 'email':data.response_data.email,'candidate_name':_candidate, 'contest':contest},
            });
            }
            else{
                console.error('something went wrong')
            }
        }
        else{
            alert('please add a vote')
        }
        
    }

    const couponApiVote = async()=>{
        const url = "/api/coupon_vote/"
        const body ={"coupon":couponRef.current.value,"candidate_id":props.id,"poll_slug":poll}
        const option = {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(body),
        };
        const apiRes = await fetch(url, option);
        if(apiRes.status == 202){
            window.location.replace(`/polls/${poll.toLowerCase()}/${candidate.toLowerCase()}?vtes=Your vote has been successfully added!!!&status=success`)
        }
        else{
            window.location.replace(`/polls/${poll.toLowerCase()}/${candidate.toLowerCase()}?vtes=Opps and error occurred!!!&status=error`)
        }
    }
    const voteHasEnded = ()=>{
        alert('voting has ended');
    }
 
    const submitVoteEmail = async (e)=>{
        e.preventDefault();
        const time_left = new Date(props.count_down).getTime();
        ifTimeRemaining(time_left, voteApiCall,voteHasEnded);
        
    }

    const submitVoteCoupon = (e)=>{
        document.querySelector("#coupon-submit").disabled = false;
        e.preventDefault();
        const time_left = new Date(props.count_down).getTime();
        ifTimeRemaining(time_left, couponApiVote, voteHasEnded);
    }

    useEffect(()=>{

        const time_let =new Date(props.count_down).getTime();
        const now = new Date().getTime();
        if((time_let-now)>0){
            setVotingEnded(false)
        }
        window.history.replaceState({...window.history.state, url:`/${urlParam.get('candidate')}`}, '', `${urlParam.get('candidate')}`)

        if(status && message){
            notification_message(status, message)
        }
    
    },[])
    return <>
        <section>
        <div className="nav-bar-caution"></div>
       {/*  <div className={showMessage?`${status}-message`:'no-display'}>
            <span>
               {message}
            </span>
            <span onClick={closeMessage}>
                <img src="../../assets/icons/close-circle.svg" className="icon-3" />
            </span>
        </div> */}
        <div className="candidate-page">
            <img src={api_url+props.image_link} alt="" className="candidate-page-img"></img>
            <div className="candidate-page-details">
                <div className="candidate-page-header">
                    <h1>{props.name}</h1>
                    <div>
                        <h4>{props.votes.toLocaleString()}</h4>
                        <p>votes</p>
                    </div>
                </div>
                <div className="office">{props.office}</div>
                <p className="candidate-page-about">{props.quote} </p>
                <div className={votingEnded?"no-display":""}>

                     <button className={voteCoupon?"no-display":"coupon-btn btn-shadow"} onClick={toggleVotingMode}>
                    vote with coupon
                    </button>
                    <form className={voteCoupon?"coupon-form":"no-display"} onSubmit={submitVoteCoupon}>
                        <button className="close-coupon-vote" type="button" onClick={toggleVotingMode}>
                        <img src="../../assets/icons/close-circle.svg" className="icon-3" />
                        </button>
                        <input type="text" placeholder="input coupon" required ref={couponRef}/>
                        <input id="coupon-submit" type="submit" value="Vote"/>
                        <p>click <span><Link href={{pathname:'../'+poll+'/coupon-payment',
                                                    query:{cst:props.cost,slg:poll}}}>here</Link>
                                </span>to get coupons</p>
                    </form>

                    <p className={voteCoupon?'no-display':'or'}>or</p>

                    <form className={voteCoupon?"no-display":"select-vote-form"} method="post" onSubmit={submitVoteEmail}>
                        <div className="select-vote-count">
                            <button className="vote-count-btn" type="button" onClick={decreaseVotes}>
                                <img src="/assets/icons/minus-white.svg" alt="" className="icon-2"></img>
                            </button>
                                <input type="number" name="" id="" defaultValue={0} ref={votesRef}></input>
                            <button className="vote-count-btn" type="button" onClick={increaseVotes}>
                                <img src="/assets/icons/add-white.svg" alt="" className="icon-2"></img>
                            </button>
                        </div>
                        <input type="email" name="" id="" placeholder="Email" ref={emailRef} required></input>
                        <input type="submit" value="vote" className="btn-shadow"></input>
                    </form>
                </div>   
            </div>
        </div>
        </section>
    </>
}