import Link from "next/link";
import {toggleHambugerBtn, toggleSideBar, toggleSearchSection} from "../../functions/navbar_functions";

import { useSelector } from "react-redux";

function Navbaroption(){

    const {name} = useSelector((state)=>state.userData);

    return(
        <>
        <section className="no-display slide-in-sections" id="mobile-side-bar">
            <div className="side-menu-content">
            <Link href={name?"/profile":"/login"} onClick={()=>{toggleHambugerBtn(); toggleSideBar()}}>
                <div className="side-menu-item">
                    <img src="/assets/icons/user-icon.svg"/>
                    <p><b>{name?name:"Login"}</b></p>
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