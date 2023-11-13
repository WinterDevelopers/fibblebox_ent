import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { useSelector, useDispatch } from "react-redux";

export default function middleware(request=NextRequest){
    let loginStatus = request.cookies.get('helmet')?.value;
    if(loginStatus == undefined){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher:['/profile/:path*','/polls/create-poll']
}