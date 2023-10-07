export default async function logoutUser(){
    const url = "/api/logout";
    const apiRes = await fetch(url);
    if(apiRes.status == 200){
        notification_message("info","you have successfully logged out")
    }
    }