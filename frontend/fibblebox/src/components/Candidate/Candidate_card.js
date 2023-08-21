import Link from "next/link";
import api_url from "../../../fecth_urls";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {useSearchParams} from "next/navigation";


export default function Candidate(props){
    const [voteCoupon, setVoteCoupon] = useState(false);

    function toggleVotingMode(){
        setVoteCoupon(!voteCoupon)
    }

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
    const urlParam = useSearchParams()

    let poll = urlParam.get('contest')
    const status = urlParam.get('status')
    const message = urlParam.get('vtes')
    
    const [showMessage, setShowMessage] = useState(false)

 
    const submitVoteEmail = async (e)=>{
        e.preventDefault()
        const body = {'email':emailRef.current.value, 'votes':votesRef.current.value, 'candidate_id':props.id}
        console.log(body);
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
           router.push({
            pathname:'/polls/payment',
            query:{'reference':data.response_data.reference,'amount':data.response_data.amount, 'votes':data.response_data.votes, 'email':data.response_data.email,'candidate_name':_candidate, 'contest':contest}
           });
        }
        else{
            console.error('something went wrong')
        }
    }

    const submitVoteCoupon = (e)=>{
        e.preventDefault()
        const body = { 'coupon':couponRef.current.value, 'candidate_id':props.id}
        console.log(body)
    }

    const closeMessage = ()=>{
        setShowMessage(false)
    }

    useEffect(()=>{
        window.history.replaceState({...window.history.state, url:`/${urlParam.get('candidate')}`}, '', `${urlParam.get('candidate')}`)

        if(status){
            setShowMessage(true);
            console.log(message);
        }
    
    },[])
    return <>
        <section>
        <div class="nav-bar-caution"></div>
        <div class={showMessage?`${status}-message`:'no-display'}>
            <span>
               {message}
            </span>
            <span onClick={closeMessage}>
                <img src="../../assets/icons/close-circle.svg" className="icon-3" />
            </span>
        </div>
        <div class="candidate-page">
            <img src={api_url+props.image_link} alt="" class="candidate-page-img"></img>
            <div class="candidate-page-details">
                <div class="candidate-page-header">
                    <h1>{props.name}</h1>
                    <div>
                        <h4>{props.votes}</h4>
                        <p>votes</p>
                    </div>
                </div>
                <div class="office">{props.office}</div>
                <p class="candidate-page-about">{props.quote}
                </p>
                
                <button class={voteCoupon?"no-display":"coupon-btn btn-shadow"} onClick={toggleVotingMode}>
                    vote with coupon
                </button>
                <form class={voteCoupon?"coupon-form":"no-display"} onSubmit={submitVoteCoupon}>
                    <button class="close-coupon-vote" type="button" onClick={toggleVotingMode}>
                    <img src="../../assets/icons/close-circle.svg" className="icon-3" />
                    </button>
                    <input type="text" placeholder="input coupon" required ref={couponRef}/>
                    <input type="submit" value="Vote"/>
                    <p>click <span><Link href={'../'+poll+'/coupon-payment'}>here</Link> </span>to get coupons</p>
                </form>

                <p class={voteCoupon?'no-display':'or'}>or</p>

                <form class={voteCoupon?"no-display":"select-vote-form"} method="post" onSubmit={submitVoteEmail}>
                    <div class="select-vote-count">
                        <button class="vote-count-btn" type="button" onClick={decreaseVotes}>
                            <img src="/assets/icons/minus-white.svg" alt="" class="icon-2"></img>
                        </button>
                            <input type="number" name="" id="" defaultValue={0} ref={votesRef}></input>
                        <button class="vote-count-btn" type="button" onClick={increaseVotes}>
                            <img src="/assets/icons/add-white.svg" alt="" class="icon-2"></img>
                        </button>
                    </div>
                    <input type="email" name="" id="" placeholder="Email" ref={emailRef} required></input>
                    <input type="submit" value="vote" class="btn-shadow"></input>
                </form>
            </div>
        </div>
        </section>
    </>
}