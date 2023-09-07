import TrendingContent from "./Trending_content"

export default function TopBanner(props){

    const home_page_data = props.home_page_data

    return <>
        <section className="top-banner">
            <h2>
                Fibblebox
            </h2>
            <h6>
                Entertainment Platform
            </h6>
            <div className="top-banner-content">
                <p>
                    Number one online Entertainment platfrom for your Polling activities, Event activities and Next-Gen blogging
                    services. All at your fingertips...
                </p>
                <a href="https://azuri.lnk.to/Chrisdubby?fbclid=PAAab6i-5tGrMakwhb9c_oWWax0zFVaYOsaVWa09VU1K3ECBQdifPv5oGzWPo">
                  <img src="../assets/images/vibeMan.webp" alt="" loading="lazy" />  
                </a>
                
            </div>
            <div className="top-banner-bottom-bar"></div>
        </section>
        <section className="top-trending">
        <h3>Trending</h3>
        <div className="trending-container">
            {home_page_data.map(x=>{
                return(
                    <TrendingContent
                        key={x.id}
                        image_link ={x.poll_image}
                        type={'polls'}
                        name = {x.name}
                        slug = {x.slug}
                    />
                )
            })}           
        </div>
    </section>
    </>
}