import { useRef } from "react";

export default function NavbarSearch(){

    const search_input = useRef()

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
                const search_container = document.querySelector("#search-results");
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
    return(
        <section className="no-display  slide-in-sections" id="search-page">
            <form className="search-form" method="post" id="search-form" onSubmit={search}>
                <input required type="search" name="" ref={search_input} id="search-input" placeholder="what are you looking for ?"/>
            </form>
            <section className="search-results-page">
                <h5>Avaliable Results</h5>
                {/* <div style="width:3rem;height:0.2rem;background-color: rgb(10, 10, 10); 
                    position: relative;top:-0.5rem; border-radius:0.1rem;
                    margin-bottom: 3rem;"></div>
                 */}
                <div className="product-item-container search-items" id='search-results'>
                 
                </div> 
            </section>
        </section>
    )
}