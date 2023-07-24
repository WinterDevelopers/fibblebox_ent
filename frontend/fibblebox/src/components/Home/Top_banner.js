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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dobus, fugiat corrupti. Reprehenderit debitis veritatis
                    distinctio nulla molestias,[default]
                </p>
                <img src="../assets/images/vibeMan.jpg" alt=""></img>
            </div>
            <div className="top-banner-bottom-bar"></div>
        </section>
        <section className="top-trending">
        <h3>Trending</h3>
        <div className="trending-container">
            <div className="trending-content">
                <img src="../assets/images/profile1.png" alt="" className="trending-image"></img>
                <img src="../assets/icons/poll-svgrepo-com.svg" alt="" className="icon-3 trending-icon"></img>
                <h6>Name</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile3.png" alt="" className="trending-image"></img>
                <img src="../assets/static 'icons/event-svgrepo-com.svg" alt="" className="icon-3 trending-icon"></img>
                <h6>Name</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile4.png" alt="" className="trending-image"></img>
                <img src="../assets/icons/news-svgrepo-com.svg" alt="" className="icon-3 trending-icon"></img>
                <h6>Name</h6>
            </div>
            <div className="trending-content">
                <img src="../assets/images/profile2.png" alt="" className="trending-image"></img>
                <img src="../assets/icons/poll-svgrepo-com.svg" alt="" className="icon-3 trending-icon"></img>
                <h6>COUNUA STUDENT OF THE YEAR 2020/2021</h6>
            </div>
           
        </div>
    </section>
    </>
}