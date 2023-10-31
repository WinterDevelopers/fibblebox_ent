import PollStep1 from "./PollStep1";
import PollStep2 from "./PollStep2";
import PollStep3 from "./PollStep3";
import PollStep4 from "./PollStep4";

import api_url from "../../../fecth_urls";

import notification_message from "@/functions/message_function";

import { useState, useRef } from "react";

export default function CreatePoll(){

    const [step1, setStep1] = useState (true);
    const [step2, setStep2] = useState (false);
    const [step3, setStep3] = useState (false);
    const [step4, setStep4] = useState (false);

    const [circle1, setCircle1] = useState(true);
    const [circle2, setCircle2] = useState(false);
    const [circle3, setCircle3] = useState(false);
    const [circle4, setCircle4] = useState(false);

    const hideStep = ()=>{
        setStep1(false);setStep2(false);setStep3(false);setStep4(false);
    }
    const showStep2 = () =>{
        hideStep();
        setStep2(true);
        setCircle2(true);
    };
    const showStep3 = () =>{
        hideStep();
        setStep3(true);
        setCircle3(true);
    };
    const showStep4 = () =>{
        hideStep();
        setStep4(true);
        setCircle4(true);
    };

    //PollStep1 variables and states
    const [name , setName] = useState(null);
    const [description ,setDescription] = useState(null);
    const [location, setLocation] = useState(null);

    //Pollstep2 variables and states
    const [cost, setCost] = useState(null)
    const [fileData, setFileData ]= useState(null);
    const [date, setDate] = useState(null);
    const [deadline, setDeadline] = useState(null);

    //To slugify our slug before sending
    const letsSlugify = slug =>
        slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
        

    const create_poll = async(nextStep)=>{
        const formData = new FormData();
        /* formData.append("active",true);
        formData.append("payment",null); */
        formData.append("name",name);
        formData.append("slug",letsSlugify(name));
        formData.append("poll_image",fileData);
        formData.append("poll_info",description);
        formData.append("date",date);
        formData.append("location",location.toUpperCase());
        formData.append("cost",cost);
        formData.append("count_down",date+" "+deadline);

        const url = api_url+"/polls/create-poll/";
        //const body = {"name":name,"poll_info":description,"count_down":deadline,"cost":cost,"location":location, "poll_image":fileData,"date":date};

        const option = {
            method:'POST',
            headers:{
            },
            body:formData
        };

        const apiRes = await fetch(url,option);
        if(apiRes.status == 201){
            notification_message("success","Your Poll has been successfully created!!!");
            nextStep()
        }
        else{
            notification_message("error","failde to create poll");
        }
    }


    return<>
        <br></br>
        <section className="create-poll-container">

            <div className="create-poll-checkpoint"></div>

            <div className="checkpoint-circle-container">
                <div className="checkpoint-circle" style={circle1?{backgroundColor:"#6aeeff"}:{}}>1</div>
                <div className="checkpoint-circle" style={circle2?{backgroundColor:"#6aeeff"}:{}}>2</div>
                <div className="checkpoint-circle" style={circle3?{backgroundColor:"#6aeeff"}:{}}>3</div>
                <div className="checkpoint-circle" style={circle4?{backgroundColor:"#6aeeff"}:{}}>4</div>
            </div>

            {step1?<PollStep1 showFunc={showStep2} set_name={setName} set_description={setDescription} set_location={setLocation}/>:''}
            {step2?<PollStep2 showFunc={showStep3} set_fileData={setFileData} set_date={setDate} set_deadline={setDeadline} set_cost={setCost}/>:''}
            {step3?<PollStep3 showFunc={showStep4} intiatePollCreation={create_poll}/>:''}
            {step4?<PollStep4 />:''}
            
        </section>

    </>
}