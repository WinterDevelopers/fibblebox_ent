import { useState, useRef, useEffect } from "react"


export default function CouponPayment(){
    const [number,setNumber] = useState(0);

    const add = ()=>{
        setNumber((number+10))
    };

    const reduce = ()=>{
        if (number >= 10){
            setNumber((number-10))
        }
    };

    const makePayment = ()=>{
        const url = '/api/purchase-coupon';
        //const body = {'poll-slug':poll, 'number_of_coupons':number}
    }
    useEffect(()=>{
        
    },[])

    return <>
        <section style={{paddingTop:'9rem'}}>
            <div className="coupon-card">
                <div>
                    <button className="coupon-remove btn-shadow" onClick={reduce}>
                        <img src="/assets/icons/minus-white.svg" alt="" class="icon-2"></img>
                    </button>
                    <p>{number}</p>
                    <button className="coupon-add btn-shadow" onClick={add}>
                        <img src="/assets/icons/add-white.svg" alt="" class="icon-2"></img>
                    </button>
                </div>
                <p>This would cost <span>{number*100}</span></p>
                <button  className="coupon-purchase">Make purchase</button>
            </div>
        </section>
    </>
}