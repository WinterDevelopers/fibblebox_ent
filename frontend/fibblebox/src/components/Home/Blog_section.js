export default function BlogSection(){
    return <>
        <section className="blog-section">
        <h3>
            keeping up
        </h3>
        <p>
            with light
        </p>
        <div className="blog-container">
            <div className="blog-card">
                <img src="../assets/images/chococake.jpg" alt="" className="blog-card-image" loading="lazy"></img>
                <h2>WHY ALWAYS CAKE</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dobus, fugiat corrupti. Reprehenderit debitis veritatis....
                </p>
                <div>
                    <div className="blog-icon-container">
                        <img src="../assets/icons/clock.svg" alt="" className="icon-3"></img>
                        <p>Today</p>
                    </div>
                    <div className="blog-icon-container">
                        <img src="../assets/icons/comment.svg" alt="" className="icon-3"></img>
                        <p>2.3k</p>
                    </div>
                </div>
            </div>
            <div className="blog-card">
                <img src="../assets/images/chair.jpg" alt="" className="blog-card-image" loading="lazy"></img>
                <h2>NEXT SOFA CHAIRS</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dobus, fugiat corrupti. Reprehenderit debitis veritatis....
                </p>
                <div>
                    <div className="blog-icon-container">
                        <img src="../assets/icons/clock.svg" alt="" className="icon-3"></img>
                        <p>Today</p>
                    </div>
                    <div className="blog-icon-container">
                        <img src="../assets/icons/comment.svg" alt="" className="icon-3"></img>
                        <p>2.3k</p>
                    </div>
                </div>
            </div>
            <div className="blog-more-samples">
                <div>
                    <img src="../assets/images/profile3.png" alt="" className="blog-more-samples-image"></img>
                    <img src="../assets/images/profile1.png" alt="" className="blog-more-samples-image"></img>
                    <img src="../assets/images/profile4.png" alt="" className="blog-more-samples-image"></img>
                </div>
                <button>
                    <img src="../assets/icons/arrow-long-right.svg" alt="" className="icon-2"></img>
                </button>
            </div>
        </div> 
    </section>
    </>
}