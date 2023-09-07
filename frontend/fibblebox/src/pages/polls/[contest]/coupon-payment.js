import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react"



export default function CouponPayment(){
    const urlParam = useSearchParams()
    const cost = urlParam.get('cst')
    const poll_slug = urlParam.get('slg')

    const [number,setNumber] = useState(0);
    const [loading, setLoading] = useState(false)

    const emailRef = useRef()

    const add = ()=>{
        setNumber((number+10))
    };

    const reduce = ()=>{
        if (number >= 10){
            setNumber((number-10))
        }
    };

    const makePurchase = async(e)=>{
        setLoading(true);
        document.querySelector(".coupon-purchase").disabled = true;
        e.preventDefault(); 
        const url = '/api/purchase-coupon';
        const body = {'poll_slug':poll_slug, 'email':emailRef.current.value, 'number_of_coupons':number};
        console.log(body)
        const option={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(body)
        };

        const apiRes = await fetch(url,option);
        if (apiRes.status == 201){
            const data = await apiRes.json();
            const data_obj = data.response;
            await makePayment(emailRef.current.value, data_obj['amount'], data_obj['reference'])
        }

    };

    const makePayment = async(email,amount,reference)=>{
        console.log(reference)
        if(typeof window !== 'undefined'){
            const paystack = await import("../../../../utils/Paystack_coupon");
            const resPayment = paystack.paystackInitialize(email, amount, reference);
            console.log('hello',resPayment)
        };
    }

    useEffect(()=>{
        
    },[])

    return <>
        <section style={{paddingTop:'9rem'}}>
            <div className="coupon-card">
                <div>
                    <button className={loading?"no-display":"coupon-remove btn-shadow"} onClick={reduce}>
                        <img src="/assets/icons/minus-white.svg" alt="" class="icon-2"/>
                    </button>
                    <p className={loading?"no-display":""}>{number}</p>
                    <button className={loading?"no-display":"coupon-add btn-shadow"} onClick={add}>
                        <img src="/assets/icons/add-white.svg" alt="" class="icon-2"/>
                    </button>
                </div>
                <p>This would cost <span>{number*cost}</span></p>
                <form className="coupon-generator-form" onSubmit={makePurchase} >
                    <input ref={emailRef} type="email" placeholder="Add email to receive coupons" required />
                    <button  className="coupon-purchase">{loading?<img className="button-loader" src="/assets/loaders/button_loader.svg"/>:'Make purchase' }</button>
                </form>
            </div>
        </section>
    </>
}