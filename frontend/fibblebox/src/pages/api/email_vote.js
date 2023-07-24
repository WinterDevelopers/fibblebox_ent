// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api_url from "../../../fecth_urls";

export default async(req, res) =>{
  
  if(req.method == 'POST'){
    const url = api_url+'/polls/create-payment/';
    
    const option = {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(req.body)
    }
    
    const apiRes = await fetch(url, option)
    console.log(apiRes.status)
    if(apiRes.status == 201){
      const data = await apiRes.json()
 
      res.status(200).json({ response_data: data});
    }

    res.status(405).json({ error: 'John Doe' });

  }
  else{
    res.setHeader('Allow',['POST']);
    return res.status(405).json({error:`${req.method} is not allowed`});
  }
}


