import { useRouter } from "next/router";
import { useState } from "react";
import RestForgottenPassword from "@/components/Authentication/ResetForgottenPassword";

export default function resFrtPas(){

    const router = useRouter();
    const {uid, token} = router.query;

    const [verified, setVerified] = useState(false);

    const yum_yum = async()=>{
        
        const body = {"uidb64":uid, "token":token};
        const url = '/api/verify_forgotten_password_reset';
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
            setVerified(true)
        }
        else{
            router.push('/login');
        };
    }
    if (typeof window != "undefined" && token){
        yum_yum()
    }

    return<>
        <RestForgottenPassword 
            verified = {verified}
            uidb64 = {uid}
        />
    </>
}