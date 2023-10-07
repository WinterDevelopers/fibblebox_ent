import SignUp from "@/components/Authentication/Signup";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

export default function signup(){

    const router = useRouter();

    const {userState} = useSelector((state)=> state.userData);
    if(userState){
        router.push('/profile')
    }

    return<>
        <Head>
            <title>Sign up page</title>
        </Head>
        <SignUp/>
    </>
}