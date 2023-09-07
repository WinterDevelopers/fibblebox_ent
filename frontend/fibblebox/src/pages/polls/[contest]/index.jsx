import api_url from "../../../../fecth_urls";
import ContestHeader from "@/components/Contests/Contest_Header";
import { useRouter } from "next/router";

export default function(data){


    if(data.data.res=='404'){
        return<>
        </>
    };

    const data_ = data.data;
    //console.log(data_)
    return<>
        <ContestHeader 
            key={data_.poll.id}
            image_link={data_.poll.poll_image}
            name = {data_.poll.name}
            info = {data_.poll.poll_info}
            offices = {data_.details}
            total_votes={data_.total_votes}
            count_down = {data_.poll.count_down}
            date = {data_.poll.date}
            cost = {data_.poll.cost}
        />
    </>
}

export async function getServerSideProps(context){
    
    const slug = context.query['contest'];
    const url = `${api_url}/polls/${slug}`;
    const apiRes = await fetch(url);
    if (apiRes.status == 200){
        const data = await apiRes.json();
        //console.log(data)
        return {props:{data}}
    };
    const data = {'res':'404'};
    return {props:{data}}
} 