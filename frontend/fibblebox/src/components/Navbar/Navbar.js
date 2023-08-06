import Navbaroption from "./Navbaroption"
import NavbarSearch from "./NavbarSearch";

import {toggleHambugerBtn, toggleSideBar, toggleSearchSection} from "../../functions/navbar_functions";
import Link from "next/link";

function Navbar(){
    
    return(
        <>
        <section id="navbar" className="navbar">
            <nav>
                <div className="search-mobile no-display-max" id="menu-search-btn" onClick={toggleSearchSection}>
                    <img src="/assets/icons/search.svg" alt="" className="icon-3"></img>
                </div>
                <div className="nav-icon">
                <Link 
                    href="/"
                    style={{textDecoration:'none',color:'black'}}
                >
                    <img src="/assets/logo.svg" className="logo-icon" />
                </Link>
                </div>
                <div className="nav-options no-display-mini">
                    <div>
                        Contact
                    </div>
                    <div>
                    <a href="/about">About</a>
                    </div>
                    <div>
                        Support
                    </div>
                </div>
                <div className="nav-search no-display-mini">
                    <form action="" method="get">
                        <div>
                            <input type="search" name="" id="">
                            </input><img src="{% static 'icons/search.svg' %}" alt="" className="icon-2"></img>
                        </div>
                        <button>search</button>
                    </form>
                </div>
                <div className="mobile-nav-btn no-display-max">
                    <img src="/assets/icons/strawberry-menu.svg" alt="" className="icon-3" id="mobile-nav-btn-open" onClick={()=>{toggleHambugerBtn(); toggleSideBar()}}></img>
                    <img src="/assets/icons/close.svg" alt="" className="no-display" id="mobile-nav-btn-close" onClick={()=>{toggleHambugerBtn(); toggleSideBar()}}></img>
                </div>
            </nav> 
        </section>
        <Navbaroption></Navbaroption>
        <NavbarSearch></NavbarSearch>
        </>)
}

export default Navbar