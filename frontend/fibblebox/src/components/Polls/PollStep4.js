import { useRouter } from "next/router";

export default function PollStep4(){
    const router = useRouter()
    const goToDashboard = ()=>{
        router.push('/')
    }
    
    return <>
        <div className="create-poll-step finally-create-poll">
            <h3>Finally</h3>
            <p>Your <span style={{color:"#0094FF"}} >Poll</span> has been <span style={{color:"#57FF48"}} >successfully</span> created. You can now  
                start managing your  poll on the Dashboard
            </p>
            <button onClick={goToDashboard}>Go to Dashboard</button>
        </div>
    </>
}