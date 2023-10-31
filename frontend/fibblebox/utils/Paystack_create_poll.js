import PaystackPop from '@paystack/inline-js';
import { PAYSTACK_PUBLIC_KEY } from '../fecth_urls';
import notification_message from '@/functions/message_function';


export const paystackInitialize = async (email,amount,reference,createPollApi,next)=>{
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: email,
        amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        ref: reference, // Replace with a reference you generated

    onSuccess: (transaction) => { 
        // Payment complete! Reference: transaction.reference 
        const reference = transaction.reference;
        verifyPayment(reference,createPollApi, next);
    },
    onCancel: () => {
        // user closed popup
    }
    });
};

async function verifyPayment (reference,createPollApi, next){

    const url = '/api/poll_payment';
    const body = {'reference':reference}
    const options={
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }
    const apiRes = await fetch(url, options);
    //console.log(apiRes)     
    if(apiRes.status == 202){
        //const res_data = await apiRes.json();
        /* const {votes} = res_data.data; */
        notification_message("info","Payment confirmed, creating your poll. Do not leave the page")
        createPollApi(next)
        //history.back();
        //window.location.replace(`${contest.toLowerCase()}/${candidate_name.toLowerCase()}?vtes=Your ${votes} vote(s) has been successfully added!!!&status=success`)
    }
    else{
        alert('your attempt to payment FAILED!!!!');
        return false
        //location.reload();
        //window.location.replace(`${contest.toLowerCase()}/${candidate_name.toLowerCase()}?vtes=Opps and error occurred!!!&status=error`)
    }
}