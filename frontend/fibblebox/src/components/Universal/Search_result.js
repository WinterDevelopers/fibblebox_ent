import api_url from "../../../fecth_urls"

export default function SearchResults(){

    return<>
        <div>
            <img src={props.image_link}/>
            <h6>{props.name}</h6>
            <p>{props.category}</p>
        </div>
    </>
}