import PasswordRecovery from "@/components/Authentication/PasswordRecovery"
import Head from "next/head"

export default function forgottenPassword(){
    
    return<>
    <Head>
        <title>Recover Password</title>
    </Head>
    <PasswordRecovery/>
    </>
}