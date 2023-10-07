import {useRouter} from "next/router";
import { useState } from "react";

import notification_message from "@/functions/message_function";
import dontSubmit from "@/functions/formDontSubmit";

export default function PollsPayment(){
    const [loading,setLoading] = useState(false);

    const router = useRouter()
    const {reference, votes, amount, email, candidate_name, contest} = router.query;

    const makePayment = async()=>{
        setLoading(true);

        const url = '/api/verify-reference/';
        const body = {"ref":reference};
        const option = {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }
        const apiRes = await fetch(url,option)
        if (apiRes.status == 200){
            if(typeof window !== 'undefined'){
                const paystack = await import("../../../utils/Paystack");
                const resPayment = paystack.paystackInitialize(email, amount, reference,candidate_name,contest);
                console.log('hello',resPayment)
            }
        }
        else{
            setLoading(false)
            notification_message("warning", "we could not verify your reference pls go back to your candidate page and vote again. Thank you")
        }
        
    }

    return <>
        <section class="candidate-vote-payment"  style={{paddingTop:'15rem'}}>
            <div>
                <p>{votes} votes for {candidate_name} would cost</p>
                <div class="payment-amout">N {amount}.00</div>
            </div>
            <div class="candidate-vote-payment-button btn-shadow" id="make-payment" onClick={loading?dontSubmit:makePayment}>{loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Make payment' }</div>
        </section>
    </> 
}