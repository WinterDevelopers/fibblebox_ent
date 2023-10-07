import { apiGateway } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const {uidb64,token} = req.body;
        apiGateway(req,res,`home/verify-reset-forgotten-password/${uidb64}/${token}/`,'GET',200,403);
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} not Allowed`});
    }
}