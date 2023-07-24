export default function EventBanner(){
    return <>
        <section className="polls-events-banner">
        <div className="event-banner-a">
            <h3 className="poll-event-banner-h3">
                EVENTS
            </h3>
            <img src="../assets/icons/calendar-color.svg" alt="" className="poll-event-banner-icon"></img>
        </div>
        <div className="event-banner-b">
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
                <button>
                  More  <img src="../assets/icons/arrow-long-right.svg" alt="" className="icon-2"></img>
                </button>
            </div>
        </div>
    </section>
    </>
}