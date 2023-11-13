import Login from "@/components/Authentication/Login"

import Head from "next/head"
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { clearUserData } from "@/redux/users_data";

export default function login(){
    const router = useRouter();
    //const dispatch = useDispatch();

    const {userState} = useSelector((state)=> state.userData);
    if(userState){
        router.push('/profile')
    }

    return<>
        <Head>
            <title>Login page</title>
        </Head>
        <Login/>
    </>
}