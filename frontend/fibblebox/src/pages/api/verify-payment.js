import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const body = req.body;
        const url = `${api_url}/polls/email-payment/`;
        const options = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        };
        const apiRes = await fetch(url, options);
        if(apiRes.status == 202){
            const data =await apiRes.json();
            return res.status(202).json({data:data});
        }
        return res.status(402).json({error:`payment was not verified`})
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} is NOT allowed`})
    }
}