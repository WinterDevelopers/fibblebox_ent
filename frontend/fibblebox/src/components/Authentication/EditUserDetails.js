import { clearUserData } from "@/redux/users_data";

export const RefreshSet = async(fxn,router,dispatch)=>{
    const apiRes2 = await fetch("/api/refresh_txc");
    
    if(apiRes2.status == 200){
        // the api function pare
        fxn()
    }
    else{
        dispatch(clearUserData());
        router.push("/login");
    }
}