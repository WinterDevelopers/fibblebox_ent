
//components imports
import BlogSection from "../components/Home/Blog_section"
import ContactUs from "../components/Home/contact_section"
import EventBanner from "../components/Home/Events_banner"
import Polls_banner from "../components/Home/Polls_banner"
import TopBanner from "../components/Home/Top_banner"

export default function Home() {
  return (
    <>
    <TopBanner></TopBanner>
    <Polls_banner></Polls_banner>
    <EventBanner></EventBanner>
    <BlogSection></BlogSection>
    <ContactUs></ContactUs>
    </>
  )
}
