import Head from "next/head";
import api_url from "../../../fecth_urls";
import ifTimeRemaining from "@/functions/validate_time_left";
import ContestOffice from "./Contest_office";
import { useRef, useEffect } from "react";


export default function ContestHeader(props){

    const time_left_display = useRef()
    const countingDownDays = useRef()
    const countingDownHours = useRef()
    const countingDownMins = useRef()
    const countingDownSecs = useRef()

    const offices = props.offices;
    const offices_list = []

    for(let a in offices){
        offices_list.push(offices[a])
    }

    const hasEndedDisplay = ()=>{
        if (typeof window !== undefined){
            time_left_display.current.innerHTML = "<div class='ended'>voting has ended</div>"
        }
    }

    const twoDigits = (digits)=>{
        if(digits<10){
            const new_value = '0'+ digits;
            return new_value
        }
        return digits
    }

    const countDown = ()=>{
        const poll_count_down = new Date(props.count_down).getTime();
        const now = new Date().getTime();
        const time_left = poll_count_down - now;
        let days = twoDigits( Math.floor(time_left/(1000*60*60*24)) );
        let hours = twoDigits( Math.floor((time_left%(1000*60*60*24))/(1000*60*60)) );
        let mins = twoDigits( Math.floor((time_left%(1000*60*60))/(1000*60)) );
        let secs = twoDigits( Math.floor((time_left%(1000*60))/(1000)) );

        return {'days':days, 'hours':hours, 'mins':mins, 'secs':secs}
    }

    const DisplayCountDown = ()=>{
        const time_left = countDown();

        countingDownDays.current.innerHTML = time_left.days;
        countingDownHours.current.innerHTML = time_left.hours;
        countingDownMins.current.innerHTML = time_left.mins;
        countingDownSecs.current.innerHTML = time_left.secs;
    }

  

    useEffect(()=>{
        const countingInterval = setInterval(()=>{
            let poll_count_down = new Date(props.count_down).getTime();
            ifTimeRemaining(poll_count_down,DisplayCountDown,hasEndedDisplay)
        },[1000])
        
        return ()=> clearInterval(countingInterval)

    },[])

    return <>
        <Head>
            <title>{props.name}</title>
            <meta name="description" content={props.info}/>
        </Head>
        <section>
            <img
            src={api_url+props.image_link}
            style={{objectFit:'cover'}}
            height={100}
            /* width={1000}
            sizes="(max-width:600px) 50, 100vw"
            quality={10} */
            alt={props.name} 
            class="contest-banner"  />

        <div class="contest-info">
            <div>
                <h1>{props.name}</h1>
                <p>
                    {props.info}
                </p>
                <div class="contest-line"></div>
            </div>
            <div className="time-left" ref={time_left_display}>
                <div>
                    <div>
                        <div className="time-left-digits" ref={countingDownDays}>00</div>
                        <div className="time-left-units">Days</div> 
                    </div>
                </div>
                <div>
                   <div>
                        <div className="time-left-digits" ref={countingDownHours}>00</div>
                        <div className="time-left-units">Hours</div>
                   </div>
                </div>
                <div>
                    <div>
                        <div className="time-left-digits" ref={countingDownMins}>00</div>
                        <div className="time-left-units">Mins</div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="time-left-digits" ref={countingDownSecs}>00</div>
                        <div className="time-left-units">Secs</div>
                    </div>
                </div>
            </div>
            {offices_list.map(x=>{
                return(
                    <ContestOffice
                        key = {x.id}
                        candidates_list={x.candidate}
                        office_name = {x.office}
                        total_votes = {props.total_votes}
                    />
                )
            })}

            
        </div>
    </section>
    </>
}