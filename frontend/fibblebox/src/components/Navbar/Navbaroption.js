import { useLayoutEffect } from "react"

function Navbaroption(){
    
    return(
        <>
        <section className="no-display slide-in-sections" id="mobile-side-bar">
            <div className="side-menu-content">
                <div className="side-menu-item ">
                    Home Page
                </div>
                <div className="side-menu-item">
                    About
                </div>
                <div className="side-menu-item">
                    Services
                </div>
                <div className="side-menu-item">
                    Contacts
                </div>
            </div>
        </section>
        </>
    )
}

export default Navbaroption