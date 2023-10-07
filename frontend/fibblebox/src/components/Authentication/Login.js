import { useRouter } from "next/router"
import Link from "next/link";
import notification_message from "@/functions/message_function";
import dontSubmit from "@/functions/formDontSubmit";
import { useRef, useState } from "react";

import { setUserData } from "@/redux/users_data";

import { useDispatch } from 'react-redux';

export default function Login(){
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef()

    const router = useRouter();
    const {status, message} = router.query;

    if(status && message){
        notification_message(status, message);
    }

    const setUserDetails = (data)=>{
        
        dispatch(setUserData({name:data.username,email:data.email, status:data.status}));
      }

    const loginFunc =async(e)=>{
        setLoading(true);
        e.preventDefault();
        const url = '/api/login';
        const body = {"email":email.current.value, "password":password.current.value}
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
            const data = await apiRes.json();
            setUserDetails(data.response_data);
            router.push("/profile");
        }
        else{
            setLoading(false)
            notification_message("error","Invalid cridentials !!!");
        }
    }
    return <>
        <section className="login-container">
            <form method="POST" onSubmit={loading?dontSubmit:loginFunc}>
                <h1>LOGIN</h1>
                <label htmlFor="display-name">Email</label>
                <input required type="email" ref={email}/>
                <label htmlFor="display-name">Password</label>
                <input required type="password" ref={password}/>
                <p><Link href={"/forgotten-password"}>Forgotten password ?</Link></p>
                <button  className="loading-button">
                    {loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Login'}
                </button>
                <p>do not have an account click <Link href={'/sign-up'}><span>here</span></Link></p>
                <div className="google-sign-in">
                    <img src="/assets/icons/google-icon.svg"/>
                    <span>login with google</span>
                </div>
            </form>
        </section>
    </>
}