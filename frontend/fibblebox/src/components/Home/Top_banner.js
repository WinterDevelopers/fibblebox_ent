export default function TopBanner(){
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
                  <img src="../assets/images/vibeMan.webp" alt=""></img>  
                </a>
                
            </div>
            <div className="top-banner-bottom-bar"></div>
        </section>
        <section className="top-trending">
        <h3>Trending</h3>
        <div className="trending-container">
            <div className="trending-content">
                <img src="../assets/images/profile1.png" alt="" className="trending-image"></img>
                <div className="poll-trending">Poll</div>
                <h6>SUN SET</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile3.png" alt="" className="trending-image"></img>
                <div className="event-trending">Event</div>
                <h6>HOME ALONE</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile4.png" alt="" className="trending-image"></img>
                <div className="blog-trending">Blog</div>
                <h6>NEW HOPE</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile2.png" alt="" className="trending-image"></img>
                <div className="poll-trending">Poll</div>
                <h6>COUNUA STUDENT OF THE YEAR 2020/2021</h6>
            </div>
           
        </div>
    </section>
    </>
}