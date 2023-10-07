import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const url = api_url+'/polls/purchase-coupons/';
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(req.body)
        };
        const apiRes = await fetch(url, option);
        if (apiRes.status == 201){
            const data = await apiRes.json();
            res.status(apiRes.status).json({response:data});
        }
        else{
            res.status(400).json({error:'something went wrong'});
        }
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} Not Allowed`})
    }
}