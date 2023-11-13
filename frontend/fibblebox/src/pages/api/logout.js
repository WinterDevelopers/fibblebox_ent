import cookie from "cookie";
import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    
    if(req.method == "GET"){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies._acxs ?? false;
        console.log(access)
        if (access !== false ){
            const url = api_url+'/home/logout';
            const option = {
                method:"GET",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${access}` 
                }
            };
            const apiRes = await fetch(url, option);
            if(apiRes.status == 200){
                
                res.setHeader('Set-Cookie',[
                    cookie.serialize('_acxs',"",{httpOnly:true,maxAge:0, sameSite:'strict',path:'/api/'}),
                    cookie.serialize('_rfhs',"",{httpOnly:true,maxAge:0, sameSite:'strict',path:'/api/'}),
                    cookie.serialize('helmet',"_^_^_",{httpOnly:false,maxAge:0, sameSite:'strict',path:'/'}),
                ]);
                return res.status(apiRes.status).json({response_data:"logged out"})
            }
        }
        else{
            return res.status(405);
        }
    }
    else{
        res.setHeader('Allow',['GET']);
        return res.status(400);
    }
}