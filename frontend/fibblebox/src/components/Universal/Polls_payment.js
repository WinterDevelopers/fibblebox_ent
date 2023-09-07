import {useRouter} from "next/router";


export default function PollsPayment(){
    
    const router = useRouter()
    const {reference, votes, amount, email, candidate_name, contest} = router.query;

    const makePayment = async()=>{
        document.getElementById('make-payment').className='no-display';
        document.getElementById('payment-processing').className="vote-payment-processing";
    /* if(typeof window !== 'undefined'){
        const paystack = await import("../../../utils/Paystack");
        const resPayment = paystack.paystackInitialize(email, amount, reference,candidate_name,contest);
        console.log('hello',resPayment)
    }; */
    }

    return <>
        <section class="candidate-vote-payment"  style={{paddingTop:'15rem'}}>
            <div>
                <p>{votes} votes for {candidate_name} would cost</p>
                <div class="payment-amout">N {amount}.00</div>
            </div>

            <div class="candidate-vote-payment-button btn-shadow" id="make-payment" onClick={makePayment}>make payment</div>
            <div id="payment-processing" className="no-display">Please wait your payment is proccessing ... <img className="button-loader" src="/assets/loaders/button_loader.svg"/></div>

        </section>
    </> 
}