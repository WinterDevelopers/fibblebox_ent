import api_url from "../../../fecth_urls";
import cookie from "cookie"

export default async(req, res) =>{
  
  if(req.method == 'POST'){
    apiGatewayAuth(req,res,'home/register-user','POST',201,405)
  }
  else{
    res.setHeader('Allow',['POST']);
    return res.status(405).json({error:`${req.method} is not allowed`});
  }
}

const apiGatewayAuth = async(request,response,_url,method,status, not_status, callbackFxn)=>{
  const url = api_url+'/'+_url;
    console.log(request.body)
    const option = {
      method:method,
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:request.body
    }
    
    const apiRes = await fetch(url, option)
    console.log(apiRes.status)
    if(apiRes.status == status){
      const data = await apiRes.json()
 
      response.status(apiRes.status).json({ response_data: data});
    }

    response.status(not_status).json({ error: 'John Doe' });
}