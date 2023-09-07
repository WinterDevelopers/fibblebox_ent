
export default function Footer(){
    return <>
        <section className="footer">
            <h3>socials</h3>
            <div className="footer-line"></div>
            <div className="footer-icons">
                <img src="/assets/icons/instagram.svg" alt="" className="icon-3"></img>
                <img src="/assets/icons/twitter.svg" alt="" className="icon-3"></img>
            </div>
            <h3>contact</h3>
            <div className="footer-line"></div>
            <div className="footer-icons">
                <img src="/assets/icons/phone.svg" alt="" className="icon-3"></img>
                <img src="/assets/icons/envelope.svg" alt="" className="icon-3"></img>
            </div>
            <div className="footer-bottom">Copyright 2023</div>
            <div className="footer-bottom">Terms and Conditions</div>
            <div className="footer-bottom">Developed by WinterDevelopers</div>
        </section>
    </>
}