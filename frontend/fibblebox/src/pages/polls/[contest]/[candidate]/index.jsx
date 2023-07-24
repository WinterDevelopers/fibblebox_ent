import api_url from "../../../../../fecth_urls";
import Candidate from "@/components/Candidate/Candidate_card";

export default function(data){
    const data_ = data.data
    return<>
        <Candidate 
            id= {data_.id}
            name = {data_.name}
            quote = {data_.quote}
            votes = {data_.votes}
            office = {data_.office}
            image_link = {data_.personal_image}
        />
    </>
}

export async function getServerSideProps(context){
    const slug = context.query['candidate'];
    console.log(slug)
    const url = `${api_url}/polls/candidate/${slug}`;
    const apiRes = await fetch(url);
    if (apiRes.status == 200){
        const data = await apiRes.json();
        return {props:{data}}
    };
    const data = {'res':'404'};
    return {props:{data}}

}