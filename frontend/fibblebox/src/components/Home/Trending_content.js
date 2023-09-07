import api_url from "../../../fecth_urls";
import Link from "next/link";

export default function TrendingContent(props){
    //props = [name,image_link,type]
    return<>
        <div className="trending-content">
            <Link href={`/${props.type.toLowerCase()}/${props.name.toLowerCase()}`} style={{textDecoration:"none",color:"black"}}>
                <img src={api_url+props.image_link} alt={props.name} className="trending-image"></img>
                <div className={`${props.type}-trending`}>{props.type}</div>
                <h6>{props.name.toUpperCase()}</h6>
            </Link>
        </div>
    </>
}