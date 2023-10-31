import { useRef } from "react";
import notification_message from "@/functions/message_function";

export default function PollStep2(props){
    const cost = useRef()
    const fileData = useRef();
    const date = useRef();
    const deadline = useRef();

    //To convert our image to base64 for url transmission
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    

    let todaysDate = new Date().toISOString().slice(0,10);
    const checkDateTime = (e)=>{
        e.preventDefault();
        const currentDate  = new Date(todaysDate);
        const pollDate = new Date(date.current.value);
        const currentDateTime = currentDate.getTime();
        const pollDateTime = pollDate.getTime();

        console.log(pollDateTime-currentDateTime)
        if(pollDateTime >= currentDateTime){
            if((pollDate-currentDate) <= 86400000){
                checkDeadline()
            }
            else{
                checkFileSize()
            }
        }
        else{
            notification_message('warning','Poll date must be today or above')
        }
    }
    

    const checkDeadline = ()=>{
        const currentDate  = new Date();
        let currentDateTimeHours = currentDate.getHours();
        let currentDateTimeMins = currentDate.getMinutes();
        const currentHourMins = (currentDateTimeHours * 60)+currentDateTimeMins+60;
        let [hrs,mins] = deadline.current.value.split(':');
        const pollHourMins = (parseInt(hrs) * 60)+parseInt(mins);

        if(currentHourMins >= pollHourMins){
            notification_message("warning","Deadline time must be more than an hour greater than current time")
        }
        else{
            checkFileSize()
        }
    }

    const checkFileSize = async()=>{
        const myfile = fileData.current.files[0].size;
        const fileSize = myfile;
        
        const requiredSize = (1024*1024) * 0.6;
        if(requiredSize >= fileSize){
            props.set_fileData(await toBase64(fileData.current.files[0]));
            props.set_date(date.current.value);
            props.set_deadline(deadline.current.value);
            props.set_cost(cost.current.value);
            ///////////////////////////////////////////
            props.showFunc()
        }
        else{
            notification_message('warning','Poll image should be 600KB or less')
        }
    }

    return<>
        <div className="create-poll-step">
            <h3>Step 2</h3>
            <form onSubmit={checkDateTime}>
                <label>select cost per vote</label>
                <select ref={cost} required>
                    <option value={50}> N 50</option>
                    <option value={100}>N 100</option>
                    <option value={200}>N 200</option>
                </select>
        
                <label>select polls date</label>    
                <input ref={date} required style={{backgroundColor:"white"}} type="date" className="creat-poll-option-date"/>

                <label>voting deadline time</label>
                <input ref={deadline} required style={{backgroundColor:"white"}} type="time" className="creat-poll-option-time"/>

                <label>Add poll image</label>
                <input ref={fileData} required style={{paddingLeft:"0.2rem", backgroundColor:"white"}} type="file" accept="image/png, image/jpeg, image/svg"  className="creat-poll-option-file"/>

                <button>NEXT</button>
            </form>
        </div>
    </>
}