import PollHeader from "../../components/Polls/PollHeader"
import PollCard from "@/components/Polls/PollCard"
import api_url from "../../../fecth_urls"

export default function polls(data){
    const data_list = data.data

    return <>
        <PollHeader></PollHeader>
        <section>
        <div class="poll-page-content">
            <h5>Recent Contests</h5>
            <div class="poll-card-container">
                {data_list.map(data_ => {
                    return(
                        <PollCard
                        key={data_.id}
                        image_link={data_.poll_image}
                        name={data_.name}
                        date={data_.date}
                        location={data_.location}
                        cost={data_.cost}
                        slug={data_.slug}
                        />
                    )
                })}
                
            </div>
            <div class="load-more">Load more</div>
        </div>
        </section>
    </>
}

export async function getServerSideProps(){
    const url = `${api_url}/polls/`;
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    return {props:{data}}
}