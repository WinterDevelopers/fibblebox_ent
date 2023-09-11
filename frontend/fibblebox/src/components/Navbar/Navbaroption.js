import { useLayoutEffect } from "react"
import Link from "next/link";
import {toggleHambugerBtn, toggleSideBar, toggleSearchSection} from "../../functions/navbar_functions";


function Navbaroption(){
    
    return(
        <>
        <section className="no-display slide-in-sections" id="mobile-side-bar">
            <div className="side-menu-content">
            <Link href="/" onClick={()=>{toggleHambugerBtn(); toggleSideBar()}}>
                <div className="side-menu-item ">
                    Home Page
                </div>
            </Link>
            <Link href="/polls" onClick={()=>{toggleHambugerBtn(); toggleSideBar()}}>
                <div className="side-menu-item">
                    Polls
                </div>
            </Link>
                <div className="side-menu-item">
                    Services
                </div>
                <div className="side-menu-item">
                    About
                </div>
            </div>
        </section>
        </>
    )
}

export default Navbaroption