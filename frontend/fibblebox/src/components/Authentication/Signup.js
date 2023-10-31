import notification_message from "@/functions/message_function";
import dontSubmit from "@/functions/formDontSubmit";
import Link from "next/link";

import { useRef,useState } from "react";

export default function SignUp(){
    const [loading,setLoading] = useState(false);

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef()

    const validatePassword =(e)=>{
        e.preventDefault()
        if(password.current.value===password2.current.value){
            signUpFunc()
        }
        else{
            notification_message("warning","Passwords dosn\'t match please review the passwords")
        }
    }

    const signUpFunc = async()=>{
        setLoading(true)
        const url = "api/sign-up";
        const body = {"email":email.current.value.toLowerCase(), "username":username.current.value.toLowerCase(), "password":password.current.value, "password2":password2.current.value};
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application',
            },
            body:JSON.stringify(body)
        };

        const apiRes = await fetch(url,option);
        if(apiRes.status == 201){
            const data = await apiRes.json()
            const email = data.response_data.email
            notification_message("info",`Please check your Email(${email}) to activate your account`)
        }
        else{
            setLoading(false)
            notification_message("error","invalid or used credidentials")
        }
    }

    return <>
        <section className="sign-up-container">
            
            <form method="POST" onSubmit={loading?dontSubmit:validatePassword} >
                <h1>SIGN UP</h1>
                <label htmlFor="display-name">Display Name</label>
                <input required type="text" id="display-name" ref={username}/>
                <label htmlFor="display-name">Email</label>
                <input required type="email" ref={email}/>
                <label htmlFor="display-name">Password</label>
                <input required type="password" ref={password}/>
                <label htmlFor="display-name">Confirm Password</label>
                <input required type="password" ref={password2}/>
                <button  className="loading-button">
                    {loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Sign Up'}
                </button>
                <p>already have an account click <Link href={"/login"} ><span>here</span></Link></p>
                <div className="google-sign-in">
                    <img src="/assets/icons/google-icon.svg"/>
                    <span>sign in with google</span>
                </div>
            </form>
        </section>
    </>
}