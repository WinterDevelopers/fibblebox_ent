import cookie from "cookie"
import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies._acxs ?? false;
        const url = api_url+"/polls/create-poll/"
        if(access == false){
            return res.status(307).json({error:'processing your access'});
            //the client side should call the update token
        }
        else{
           
            const option = {
                method:'POST',
                headers:{
                    'Content-Type':req.headers["content-type"],
                    'Authorization':`Bearer ${access}` 
                },
                body:req.body,
            }
            const apiRes = await fetch(url, option);
            if(apiRes.status == 201){
                const data = await apiRes.json();
                //console.log("DATA",data);
                return res.status(apiRes.status).json({response_data:data})
            }
            else{
                res.setHeader('Allow',['POST']);
                return res.status(405).json({error:'Not Authorizated to make this request'});
            }
        }
        //apiGatewayAuth(req,res,`polls/create-poll/`,'POST',201,409);
    }
    else{
        res.setHeaders('Allow',['POST']);
        return res.status(405).json({error:"method not allowed"})
    }
}