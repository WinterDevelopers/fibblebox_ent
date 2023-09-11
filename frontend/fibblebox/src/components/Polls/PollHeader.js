import notification_message from "@/functions/message_function"
import { useEffect } from "react"


export default function PollHeader(){
    
    useEffect(()=>{
        //notification_message('success','Testing the code let us see how this would end if at the final moment time does not wait')
    },[])
    
    return <>
        <section>
            <div className="poll-header">
                <div className="nav-bar-caution"></div>
                <p>Hello, you there!!!!</p>
                <h3>Let's Explore and find your Contests</h3>
            </div>
        </section>
    </>
}