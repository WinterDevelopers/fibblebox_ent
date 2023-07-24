import Link from "next/link"

export default function Polls_banner(){
    return <>
        <section className="polls-events-banner">
        <div className="poll-banner-a">
            <h3 className="poll-event-banner-h3">
                POLLS
            </h3>
            <img src="../assets/icons/poll-banner-icon.svg" alt="" className="poll-event-banner-icon"></img>
        </div>
        <div className="poll-banner-b">
            <div className="poll-event-banner-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dobus, fugiat corrupti. Reprehenderit debitis veritatis
                distinctio nulla molestias,[default]
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dobus, fugiat corrupti. Reprehenderit debitis veritatis
                distinctio nulla molestias,[default]
            </div>
            <div className="poll-event-banner-others">
                <div>
                    <img src="../assets/images/profile3.png" alt="" className="poll-event-circular-image"></img>
                    <img src="../assets/images/profile1.png" alt="" className="poll-event-circular-image"></img>
                    <img src="../assets/images/profile4.png" alt="" className="poll-event-circular-image"></img>
                </div>
                <Link href="/polls" style={{textDecoration:'none', color:'black'}}>
                    <button className="btn-shadow">
                    More  <img src="../assets/icons/arrow-long-right.svg" alt="" className="icon-2"></img>
                    </button>
                </Link>
                
                
            </div>
        </div>
    </section>
    </>
}