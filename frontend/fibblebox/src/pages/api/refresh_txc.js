import { updateToken } from "@/functions/api_gateways"



export default async(req,res)=>{
    if(req.method == 'GET'){
        const apiRes = await updateToken(req,res);
        console.log("we have set it",apiRes.status)
        return res.status(apiRes.status).json({data:"SET"})
    }
    else{
        res.setHeader('Allow',['GET'])
        return res.status(400)
    }
}