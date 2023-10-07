import api_url from "../../../fecth_urls";
import cookie from "cookie"

import { setUserData } from "@/redux/users_data";

import {useDispatch} from "react-redux";
import { apiGateway, apiGatewayAuth } from "@/functions/api_gateways";

export default async(req,res)=>{
    if(req.method == 'GET'){
        apiGatewayAuth(req,res,'home/user-details','GET',200,403,retry=true, setUserDetails);
    }
    else{
        res.setHeader('Allow',['GET']);
        return res.status(405).json({error:`${req.method} Not Allowed`});
    }
}

const setUserDetails = (data)=>{
    dispatch = useDispatch();
    dispatch(setUserData({name:'testing',email:'testing@mail.com', status:"customer"}));
}