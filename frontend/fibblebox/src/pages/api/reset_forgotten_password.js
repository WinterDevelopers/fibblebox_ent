import { apiGateway } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        apiGateway(req,res,`home/reset-frogotten-password`,'POST',201,403);
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} not Allowed`});
    }
}