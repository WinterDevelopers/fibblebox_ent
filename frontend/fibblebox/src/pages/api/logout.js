import cookie from "cookie";

export default async (req,res)=>{
    

    if(req.method == "GET"){
        res.setHeader('Set-Cookie',[
            cookie.serialize('_acxs',"",{httpOnly:true,maxAge:0, sameSite:'strict',path:'/api/'}),
            cookie.serialize('_rfhs',"",{httpOnly:true,maxAge:0, sameSite:'strict',path:'/api/'}),
            cookie.serialize('helmet',"_^_^_",{httpOnly:false,maxAge:0, sameSite:'strict',path:'/'}),
        ]);
        return res.status(200)
    }
    else{
        res.setHeader('Allow',['GET']);
        return res.status(100);
    }
}