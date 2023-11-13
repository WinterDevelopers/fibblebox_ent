import CreatePoll from "@/components/Polls/CreatePoll";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function create_poll(){
    
    return<>
        <CreatePoll></CreatePoll>
    </>
}