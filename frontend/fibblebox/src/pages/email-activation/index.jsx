import {useRouter} from "next/router";
import { useEffect,useState} from "react";

import Head from "next/head";

import notification_message from "@/functions/message_function";

export default function activateEmail(){
    const [trial, setTrial] = useState(true)
    const router = useRouter();
    const {uindx_tin, token} = router.query;
    
    const verifyEmail = async()=>{
        const url = "/api/verify_email";
        const body = {"uid":uindx_tin, "token":token};
        const option = {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }
        const apiRes = await fetch(url,option);
        if(apiRes.status == 202){
            router.push({
                pathname:"/login",
                query:{
                    status:"success",
                    message:"Your account has been activated you may now Log in !!!!"
                },
            })
        }
        else if(apiRes.status == 304){
            router.push("/login")
        }
        else{
            notification_message("error","Opps something went wrong during verification");
            router.push("/sign-up")
        }
    }
    
    if (uindx_tin != undefined && trial==true){
        setTrial(false);
        verifyEmail();
    }
    
    useEffect(()=>{
    
    },[])
    
    return<>
        <Head>Activate Email</Head>
        <section className="verfy-email-wating-container" >
            <div className="verfy-email-wating" >
                <img src="/assets/loaders/button_loader.svg" />
                <div>Trying verfying your Email</div>
            </div>
        </section>
    </>
}