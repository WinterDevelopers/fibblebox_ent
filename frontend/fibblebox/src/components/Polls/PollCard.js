import Image from "next/image";
import Link from "next/link";
import api_url from "../../../fecth_urls";


export default function PollCard(props){
    return <>
        <div className="poll-card">
            <Link  href={"polls/"+props.slug} 
                    style={{textDecoration:'none',color:'#343434'}}>

                <img 
                src={api_url+props.image_link} 
                alt={props.name} 
                className="poll-card-img" 
                /* width={100} 
                height={300} 
                sizes="(max-width:600px) 100%, 100%" 
                quality={8} */
                style={{objectFit:'cover'}}
                >
                </img>
                <div>
                    <div className="poll-card-header">
                        <div className="poll-card-header-text">{props.name}</div>
                        <div>
                            <p className="poll-card-header-num">300</p>
                            <div>votes</div>
                        </div>
                    </div>
                    <div>
                        {props.date}
                    </div>
                    <div className="poll-card-bottom">
                        <div>
                            <img src="../assets/icons/location.svg" alt="location-icon" className="icon-2"></img>
                            {props.location}
                        </div>
                        <div>
                            <img src="../assets/icons/naira.svg" alt="location-icon" className="icon-2"></img>
                            {props.cost}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>
}