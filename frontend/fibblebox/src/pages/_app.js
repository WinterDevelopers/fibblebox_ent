import Router from 'next/router'
import { useState } from 'react'
//css
import '@/styles/globals.css'
//components
import LoadingPage from '@/components/Universal/Loading_page'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);
  //shows the loading icon while the page is loading
  Router.events.on("routeChangeStart",(url)=>{setLoading(true)});
  //stops the loading icon once the page is done loading
  Router.events.on("routeChangeComplete",(url)=>{setLoading(false)});

  return <>
    {loading&&<LoadingPage/>}
    <Navbar></Navbar>
    <Component {...pageProps} />
    <Footer></Footer>
  </>
}
