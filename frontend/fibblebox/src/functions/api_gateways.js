import api_url from "../../fecth_urls";
import cookie from "cookie";

export const apiGateway = async(request,response,_url,method,status, not_status)=>{
    const url = api_url+'/'+_url;
    if(method == "GET"){
        const apiRes = await fetch(url);
        console.log(apiRes.status)
        if(apiRes.status == status){
        const data = await apiRes.json()

        return response.status(status).json({ response_data: data});
        }
        else{

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
        }
        const apiRes = await fetch(url, option)
        console.log(apiRes.status)
        if(apiRes.status == status){
        const data = await apiRes.json()

        return response.status(apiRes.status).json({ response_data: data});
        }
        else{

            return response.status(not_status).json({ error: 'John Doe' });
        }
    }
}

export const apiGatewayAuth = async(request,response,_url,method,status, not_status,retry=false,callbackFxn)=>{
    const cookies = cookie.parse(request.headers.cookie ?? '');
        const access = cookies._acxs ?? false;

        if(access == false){
            return response.status(not_status).json({error:'Not Authorizated to make this request'});
        }
        else{
            const url = `${api_url}/${_url}`;
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
                else if(retry){
                    const authRes = updateToken(request,response)
                    if(authRes == 200){
                        apiGatewayAuth(request,response,_url,method,status,405,false)
                    }
                }
                else{
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
            else if(retry){
                const authRes = updateToken(request,response)
                if(authRes == 200){
                    apiGatewayAuth(request,response,_url,method,status,405,false)
                }
            }
            else{
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
        const body = JSON.stringify({refresh});
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:body
        }
        const apiRes = await fetch(url,option);
        if(apiRes.status == 200){
            return 200
        }
        else{
            return res.status(403).json({error:'Not Authorizated to make this request'});
        }
    }
    
}