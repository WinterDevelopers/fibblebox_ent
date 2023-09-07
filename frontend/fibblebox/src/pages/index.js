
//components imports
import Head from "next/head"

import api_url from "../../fecth_urls"

import BlogSection from "../components/Home/Blog_section"
import ContactUs from "../components/Home/contact_section"
import EventBanner from "../components/Home/Events_banner"
import Polls_banner from "../components/Home/Polls_banner"
import TopBanner from "../components/Home/Top_banner"

export default function Home(props) {
  const home_page_data = props["trending-polls"];
  return (
    <>
    <Head>
      <title>Fibblebox</title>
    </Head>
    <TopBanner home_page_data={home_page_data}></TopBanner>
    <Polls_banner></Polls_banner>
    <EventBanner></EventBanner>
    <BlogSection></BlogSection>
    <ContactUs></ContactUs>
    </>
  )
}


export async function getServerSideProps(){
  let url = `${api_url}/home/home-page-data`;
  const apiRes = await fetch(url);
  if(apiRes.status==200){
    const data = await apiRes.json();
    return {props:data};
  }
  else{}
}