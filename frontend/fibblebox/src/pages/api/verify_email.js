import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if (req.method = 'POST'){
        const uid = req.body['uid'];
        const token = req.body['token'];

        const url = `${api_url}/home/activate/${uid}/${token}`;
        const apiRes = await fetch(url)

        console.log("ddafaf",apiRes.status)

        if(apiRes.status == 202){
            const data = await apiRes.json();
            return res.status(202).json({data:data})
        }
        else if(apiRes.status == 304){
            return res.status(304).json({data:""})
        }
        else{
            return res.status(apiRes.status).json({data:""})
        }
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:"Not Allowed"})
    }
}