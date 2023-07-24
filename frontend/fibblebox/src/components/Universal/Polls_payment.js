import {useRouter} from "next/router";


export default function PollsPayment(){
    
    const router = useRouter()
    const {reference, votes, amount, email, candidate_name, contest} = router.query;

    const makePayment = async()=>{
        if(typeof window !== 'undefined'){
            const paystack = await import("../../../utils/Paystack");
            const resPayment = paystack.paystackInitialize(email, amount, reference,candidate_name,contest);
            console.log('hello',resPayment)
        };
    }

    return <>
        <section class="candidate-vote-payment"  style={{paddingTop:'15rem'}}>
            <div>
                <p>{votes} votes for vibe man would cost</p>
                <div class="payment-amout">N {amount}.00</div>
            </div>

            <div class="candidate-vote-payment-button btn-shadow" onClick={makePayment}>make payment</div>

        </section>
    </> 
}