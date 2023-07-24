import '@/styles/globals.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function App({ Component, pageProps }) {
  return <>
    <Navbar></Navbar>
    <Component {...pageProps} />
    <Footer></Footer>
  </>
}
