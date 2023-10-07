import Navbaroption from "./Navbaroption"
import NavbarSearch from "./NavbarSearch";

import { useRef } from "react";

import {toggleHambugerBtn, toggleSideBar, toggleSearchSection} from "../../functions/navbar_functions";

import { useSelector } from "react-redux";

import Link from "next/link";

function Navbar(){
    const search_input = useRef();

    const close_search_result = ()=>{
        if(typeof window !== "undefined"){
            document.getElementById("navbar-search-container").className="no-display";
        }
    }

    const search = (e)=>{
        e.preventDefault();
        searchApi()
    }
    const searchApi = async()=>{
        const url = '/api/search/';
        const body  = {"search_param":search_input.current.value};
        const option = {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        };
        const apiRes = await fetch(url, option);

        if(apiRes.status == 200){
            const data = await apiRes.json()
            const search_result_list = data.data;
            
            if(typeof window !== "undefined"){
                document.getElementById("navbar-search-container").className="navbar-search-results no-display-mini"
                const search_container = document.querySelector("#navbar-search-results");
                search_container.innerHTML="";

                for(let a = 0; a < search_result_list.length; a++){
                    let b = search_result_list[a]
                    search_container.innerHTML += 
                    `<a href="/polls/${b["slug"]}" style="text-decoration:none;color:black">
                        <div class="search-result">
                            <img src=${b["poll_image"]} class="icon-3"/>
                            <h4>${b["name"]}<span>-<span></h4>
                            <p>Poll</p>
                        </div>
                    </a>`
                }
            }
            
        }
    }
    
    const {name} = useSelector((state)=>state.userData);

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
                        <Link href="/polls">
                            Polls
                        </Link>
                    </div>
                    <div>
                    <a href="/about">About</a>
                    </div>
                    <div>
                        Services
                    </div>  
                </div>
                <div className="nav-option-user no-display-mini">
                    <Link href={name?"/profile":"/login"} >
                        <img src="/assets/icons/user-icon.svg"/>
                        <p>{name?name:"Login"}</p>
                    </Link>
                </div>
                <div className="nav-search no-display-mini">
                    <form  method="post" onSubmit={search}>
                        <div>
                            <input required type="search" name="" id="" ref={search_input}>
                            </input>{/* <img src="/assets/icons/search.svg
                            " alt="" className="icon-2"></img> */}
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
        <div id="message-container"></div>
        <div id="navbar-search-container" className="no-display">
            <div id="navbar-search-results" ></div>
            <button onClick={close_search_result}>close</button>
        </div>
        </>
    )
}

export default Navbar