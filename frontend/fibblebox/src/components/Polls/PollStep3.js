import { useRef, useState } from "react";

import dontSubmit from "@/functions/formDontSubmit";
import notification_message from "@/functions/message_function";

export default function PollStep3(props){
    const email = useRef();
    const [loading, setLoading] = useState(false);

    const intiatePollPayment = async(e)=>{
        e.preventDefault();
        setLoading(true)
        let body = {"email":email.current.value.toLowerCase()};
        let url = '/api/initiate_poll_payment';
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }
        const apiRes = await fetch(url, option);
        if(apiRes.status == 201){
            let data = await apiRes.json();
            let _data = data.response_data
            initiatePaystack(email.current.value,_data["amount"],_data["reference"]);
        }
        else{
            setLoading(false)
            alert('something went wrong');
        }
    };
    
    const initiatePaystack = async(email,amount,reference)=>{
        if(typeof window !== 'undefined'){
            const paystack = await import("../../../utils/Paystack_create_poll");
            const resPayment = await paystack.paystackInitialize(email, amount, reference, props.intiatePollCreation,props.showFunc);
            notification_message('info','Please dont leave this page till your payment is confirmed')
            
        }   
    }

    return<>
         <div className="create-poll-step activate-poll">
            <h3>Step 3</h3>
            <h4>Activate the Poll</h4>
            <p>Requires Validation fee. 
            this payment validates, 
            this poll and proceeds to create it
            </p>
            <form onSubmit={loading?dontSubmit : intiatePollPayment}>
                <div>
                    <p>Activation Fee</p>
                    <h2>N 1000.00</h2>
                        <input ref={email} type="email" required placeholder="your email please"/>
                </div>
                <button>
                    {loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Make Payment'}
                </button>
            </form>
        </div>
    </>
}