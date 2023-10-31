import { apiGateway } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const {reference}= req.body
        console.log("uydgtrhryhry")
        apiGateway(req,res,`polls/poll-payment-verification/${reference}`,'GET',202,402)
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:'Method is not allowed'})
    }
}