import api_url from "../../fecth_urls";
import cookie from "cookie";

export const apiGateway = async(request,response,_url,method,status, not_status)=>{
    const url = api_url+'/'+_url;
    if(method == "GET"){
        const apiRes = await fetch(url);
        //console.log(apiRes.status)
        if(apiRes.status == status){
            const data = await apiRes.json()

            return response.status(status).json({ response_data: data});
        }
        else{
            response.setHeader('Allow',['GET']);
            return response.status(not_status).json({ error: 'Not allowed' });
        }
    }
    else if(method == "POST"){
        const option = {
            method:method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(request.body)
        };

        const apiRes = await fetch(url, option)
        //console.log(apiRes.status)
        if(apiRes.status == status){
        const data = await apiRes.json()

        return response.status(apiRes.status).json({ response_data: data});
        }
        else{
            response.setHeader('Allow',['POST']);
            return response.status(not_status).json({ error: 'post failed' });
        }
    }
}

export const apiGatewayAuth = async(request,response,_url,method,status, not_status,retry=false,callbackFxn)=>{
    const cookies = cookie.parse(request.headers.cookie ?? '');
        const access = cookies._acxs ?? false;
        
        if(access == false){
            //console.log("NAHH NO ACCESS")
            return response.status(307).json({error:'processing your access'});
            //the client side should call the update token
        }
        else{
            const url = `${api_url}/${_url}`;
            //////////////////////////////////////////////////////////////////////////
            if(method == "POST"){
                const option = {
                    method:method,
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${access}` 
                    },
                    body:JSON.stringify(request.body)
                }
                const apiRes = await fetch(url, option);
                if(apiRes.status == status){
                    const data = await apiRes.json();
                    //console.log("DATA",data);
                    return response.status(apiRes.status).json({response_data:data})
                }
                else{
                    response.setHeader('Allow',['POST']);
                    return response.status(not_status).json({error:'Not Authorizated to make this request'});
                }
            }

            else if(method == "GET"){
                const option = {
                    method:method,
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${access}` 
                    }
                };
                const apiRes = await fetch(url, option);
                if(apiRes.status == status){
                    const data = await apiRes.json();
                    //console.log("DATA",data);
                    return response.status(apiRes.status).json({response_data:data})
                }
                else{
                    response.setHeader('Allow',['POST']);
                    return response.status(not_status).json({error:'Not Authorizated to make this request'});
                }
            }
            
        }
}

export const updateToken = async(req,res)=>{
    const url = api_url+"/home/refresh";
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const refresh = cookies._rfhs ?? false;

    if(refresh !== false){
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"refresh":refresh})
        }
        const apiRes = await fetch(url,option);
        if(apiRes.status == 200){
            const data = await apiRes.json();
            res.setHeader('Set-Cookie',[
                cookie.serialize('_acxs',data.access,{httpOnly:true,maxAge:60*60*24, sameSite:'strict',path:'/api/'}),
                cookie.serialize('_rfhs',data.refresh,{httpOnly:true,maxAge:60*60*24*3, sameSite:'strict',path:'/api/'}),
                cookie.serialize('helmet',"_^_^_",{httpOnly:false,maxAge:60*60*24*3, sameSite:'strict',path:'/'}),
            ]);

            return res.status(200);
        }
        else{
            return res.status(403).json({error:'Not Authorizated to make this request ref'});
        }
    }
    else{
        return res.status(403).json({error:'Not Authorizated to make this request ref'});
    }
}