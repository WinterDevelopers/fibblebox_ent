import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const url = `${api_url}/polls/coupon-vote/`;
        const body = req.body
        const option = {
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }
        const apiRes = await fetch(url,option)
        if(apiRes.status == 202){
            res.status(apiRes.status).json({data:"was successful"})
        }
        else{
            res.status(apiRes.status).json({error:"something went wrong"})
        }
    }
    else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error:`${req.method} Not Allowed`});
    }
}