import { apiGateway } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        apiGateway(req,res,'home/recover-forgotten-password','POST',200,400);
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} not Allowed`});
    }
}