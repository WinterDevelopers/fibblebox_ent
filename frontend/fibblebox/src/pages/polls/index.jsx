import PollHeader from "../../components/Polls/PollHeader"
import PollCard from "@/components/Polls/PollCard"
import api_url from "../../../fecth_urls"

export default function polls(data){
    const data_list = data.data
    console.log(data_list)
    return <>
        <PollHeader></PollHeader>
        <section>
        <div class="poll-page-content">
            <h5>Recent Contests</h5>
            <div class="poll-card-container">
                {data_list.map(data_ => {
                    return(
                        <PollCard
                        key={data_.poll.id}
                        image_link={data_.poll.poll_image}
                        name={data_.poll.name}
                        date={data_.poll.date}
                        total_votes={data_.total_votes}
                        location={data_.poll.location}
                        cost={data_.poll.cost}
                        slug={data_.poll.slug}
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