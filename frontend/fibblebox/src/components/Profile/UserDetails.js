import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { clearUserData } from "@/redux/users_data";

import logoutUser from "@/functions/logout";
import Link from "next/link";
export default function UserDetails(props){
    const router = useRouter();
    const dispatch = useDispatch();

    const eraseUserData = async()=>{
        dispatch(clearUserData());
        logoutUser();
        router.push('/login')
    };
    return<>
        <section className="profile-container">
            <img src="../assets/icons/user-icon.svg"/>
            <h4>{props.name}</h4>
            <div className="user-status">
                {props.status}
            </div>
            <div className="user-email">
                <h5>{props.email}</h5>
            </div>
            <button onClick={eraseUserData}>Logout</button>
            <Link href={"/profile/change-password"}><p>Change Password</p></Link>
        </section>
    </>
}