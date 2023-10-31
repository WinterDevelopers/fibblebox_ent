import { useRef, useState } from "react";

import dontSubmit from "@/functions/formDontSubmit";

import notification_message from "@/functions/message_function";

export default function PollStep1(props){

    const [loading,setLoading] = useState(false);

    const name = useRef();
    const description = useRef();
    const location = useRef();

    const checkNameAvaliability = async(e)=>{
        setLoading(true)
        e.preventDefault()
        const url = "/api/check_poll_name";
        const body = {"name":name.current.value};
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        };

        const apiRes = await fetch(url,option);
        if(apiRes.status == 200){
            props.set_name(name.current.value);
            props.set_description(description.current.value);
            props.set_location(location.current.value);
            /////////////////////////////////////////////////
            props.showFunc();
        }
        else{
            notification_message("error","name not avaliable");
            setLoading(false);
        }
    }

    return<>
        <div className="create-poll-step">
            <h3>Step 1</h3>
            <form onSubmit={loading?dontSubmit:checkNameAvaliability}>
                <input placeholder="Poll name" required ref={name}/>
                <input style={{height:"4rem",paddingTop:"0rem"}} placeholder="poll description" required ref={description}/>
                <input placeholder="location" required ref={location}/>
                <button >
                    {loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'NEXT'}
                </button>
            </form>
        </div>
    </>
}