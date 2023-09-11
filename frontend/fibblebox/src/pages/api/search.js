import api_url from "../../../fecth_urls";

export default async(req,res)=>{
    if (req.method = 'POST'){
        const search_param = req.body['search_param'];
        const url = `${api_url}/home/search?search=${search_param}`;
        const apiRes = await fetch(url)
        if(apiRes.status == 200){
            const data = await apiRes.json();
            return res.status(200).json({data:data})
        }
        else{
            return res.status(204).json({data:""})
        }
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:"Not Allowed"})
    }
}