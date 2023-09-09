import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if(req.method == 'POST'){
        const body = req.body;

        const url = `${api_url}/polls/verify-reference/${body["ref"]}`;
 
        const apiRes = await fetch(url);
        if(apiRes.status == 200){
            const data =await apiRes.json();
            return res.status(200).json({data:data});
        }
        return res.status(402).json({error:`payment was not verified`})
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`${req.method} is NOT allowed`})
    }
}