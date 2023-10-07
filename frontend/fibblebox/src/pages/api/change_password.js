import { setUserData } from "@/redux/users_data";
import {useDispatch} from "react-redux";

import { apiGateway, apiGatewayAuth } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'POST'){
        apiGatewayAuth(req,res,'home/change-password','POST',202,401,true);
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} Not Allowed`});
    }
}