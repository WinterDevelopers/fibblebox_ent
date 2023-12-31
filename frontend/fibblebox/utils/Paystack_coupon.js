import PaystackPop from '@paystack/inline-js';
import { PAYSTACK_PUBLIC_KEY } from '../fecth_urls';


export const paystackInitialize = async (email,amount,reference)=>{
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
        verifyPayment(reference);
    },
    onCancel: () => {
        // user closed popup
    }
    });
};

async function verifyPayment (reference){

    const url = '/api/coupon-payment';
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
        const res_data = await apiRes.json();
        /* const {votes} = res_data.data; */
        alert('Coupon was purchased successfully and sent to your Email');
        history.back();
        //window.location.replace(`${contest.toLowerCase()}/${candidate_name.toLowerCase()}?vtes=Your ${votes} vote(s) has been successfully added!!!&status=success`)
    }
    else{
        alert('your attempt to purchase coupons FAILED!!!!');
        location.reload();
        //window.location.replace(`${contest.toLowerCase()}/${candidate_name.toLowerCase()}?vtes=Opps and error occurred!!!&status=error`)
    }
}