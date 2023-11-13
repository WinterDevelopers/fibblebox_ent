import api_url from "../../../fecth_urls";
import cookie from "cookie"

import { apiGatewayAuth } from "@/functions/api_gateways";


export default async(req,res)=>{

  if(req.method == 'POST'){
    const url = api_url+'/home/login';
    const option = {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(req.body)
    };
    
    const apiRes = await fetch(url, option);
    if(apiRes.status == 200){
        const data = await apiRes.json();

        res.setHeader('Set-Cookie',[
          cookie.serialize('_acxs',data.access,{httpOnly:true,maxAge:60*60*24, sameSite:'strict',path:'/api/'}),
          cookie.serialize('_rfhs',data.refresh,{httpOnly:true,maxAge:60*60*24*3, sameSite:'strict',path:'/api/'}),
          cookie.serialize('helmet',"_^_^_",{httpOnly:false,maxAge:60*60*24*3, sameSite:'strict',path:'/'}),
        ]);

        /* const finalRes = await apiGatewayAuth(req,res,'home/user-details','GET',200,405,true);
        const finalData = await finalRes.json()      
        return res.status(apiRes.status).json({data:finalData}); */

        //await apiGatewayAuth(req,res,'home/user-details','GET',200,405,true);      
        return res.status(apiRes.status).json({data:"Successfully logged in"});
    }

    res.status(405).json({ error: 'John Doe' });
    }
    else{
      res.setHeader('Allow',['POST']);
      return res.status(405).json({error:`${req.method} is not allowed`});
    }
};