export default function(){
    return(
        <section className="no-display  slide-in-sections" id="search-page">
            <form action="" className="search-form" method="post" id="search-form">
                <input type="search" name="" id="search-input" placeholder="what are you looking for ?"></input>
            </form>
            <section className="search-results-page">
                <h5>Avaliable Results</h5>
                {/* <div style="width:3rem;height:0.2rem;background-color: rgb(10, 10, 10); position: relative;top:-0.5rem; border-radius:0.1rem;margin-bottom: 3rem;"></div>
                 */}<div className="product-item-container search-items" id='search-results'>
                </div> 
            </section>
        </section>
    )
}