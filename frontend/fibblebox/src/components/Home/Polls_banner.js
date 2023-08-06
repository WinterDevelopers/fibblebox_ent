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
                We provide our clients and users with the best online polling services, ranging from 
                free polling services , specific polling services to monitized polling services. Our 
                goal is to allow our clients and users enjoy a seamless environment to host their activities.
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