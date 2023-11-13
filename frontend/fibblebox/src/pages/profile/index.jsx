import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import UserDetails from "@/components/Profile/UserDetails";
import PollProfile from "@/components/Profile/PollProfile";

export default function Profile(){
    const router = useRouter();

    const {userState,name,email,status} = useSelector((state)=> state.userData);
    /* if(!userState){
        router.push('/login')
    } */

    return<>
        <br></br>
        <UserDetails 
            name={name}
            email={email}
            status = {status}
        />
        <PollProfile/>
    </>
} 