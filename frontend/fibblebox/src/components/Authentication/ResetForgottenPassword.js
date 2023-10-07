import notification_message from "@/functions/message_function";
import dontSubmit from "@/functions/formDontSubmit";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function RestForgottenPassword(props){
    const router = useRouter()

    const newPassword = useRef();
    const confirmPassword = useRef();

    const [loading,setLoading] = useState(false);
    //props.verified

    const validatePassword =(e)=>{
        if(props.verified){
            setLoading(true)
            e.preventDefault()
            if(newPassword.current.value===confirmPassword.current.value){
                reset_password()
            }
            else{
                notification_message("warning","Passwords dosn\'t match please review the passwords");
                setLoading(false);
            }
        }
    }

    const reset_password = async()=>{
        const url = '/api/reset_forgotten_password';
        const body = {"password":newPassword.current.value, "uidb64":props.uidb64};
        
        const option = {
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        };

        const apiRes = await fetch(url,option);
        if(apiRes.status == 201){
            router.push({
                pathname:"/login",
                query:{
                    message:"Password has been changed you can now login",
                    status:"success"
                }
            });
        }
        else{
            setLoading(false);
            notification_message("error","Opps something went wrong");
        }
    }

    return<>
        <br></br>
        <section>
            <div className="reset-forgotten-password">
                <h2>Enter your new password</h2>
                <form onSubmit={loading?dontSubmit:validatePassword}>
                    <input type="password" required placeholder="New password" ref={newPassword} />
                    <input type="password" required placeholder="Confirm password" ref={confirmPassword} />
                    <button  className="coupon-purchase">{loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Reset Password' }</button>
                </form>
            </div>
        </section>
    </>
}