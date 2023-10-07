import { useRef, useState } from "react";
import notification_message from "@/functions/message_function";
import dontSubmit from "@/functions/formDontSubmit";

export default function PasswordRecovery(){
    const email = useRef();
    const [loading,setLoading] = useState(false);

    const recoverPassword = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const url = '/api/forgotten_password_recovery';
        const body = {"email":email.current.value};
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        };
        const apiRes = await fetch(url,option);
        if(apiRes.status == 200){
            notification_message("success","your rest link has been sent to your mail");
            setLoading(false)
        }
        else{
            notification_message("error","email not registered or invalid");
            setLoading(false)
        };
    }


    return<>
        <br></br>
        <div className="password-recovery-container">
            <h2>Recover your Forgotten Password</h2>
            <p>A link to recover your password will be sent to your mail below</p>
            <form onSubmit={loading?dontSubmit:recoverPassword}>
                <input type="email" placeholder="Your email" ref={email}/>
                <button  className="coupon-purchase">{loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Send' }</button>
            </form>
        </div>
    </>
}