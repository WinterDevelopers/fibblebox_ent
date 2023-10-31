import { apiGateway } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        apiGateway(req,res,`polls/generate-poll-payment/`,'POST',201,409);
    }
    else{
        res.setHeaders('Allow',['POST']);
        return res.status(405).json({error:"method not allowed"})
    }
}