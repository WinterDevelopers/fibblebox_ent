import api_url from "../../../fecth_urls"
import Link from "next/link"
import { useRouter } from "next/router"

export default function OfficeCandidate(props){
    const router = useRouter();
    const current_path = router.query['contest'];

    const vote_percentage_bar = ()=>{
        const bar = 250-((props.votes/props.total_votes)*160);
        if(isNaN(bar)){
            return 250;
        }
        
        return bar;
    };

    const votes_percentage = ()=>{
        const vote_percentage = (props.votes/props.total_votes)*100;
       
        if(isNaN(vote_percentage)){
            return 0.0;
        }
        return vote_percentage.toFixed(1);
    };

    return<>
        <div class="office-contender-card">
                    <img src={api_url+props.image_link} alt={props.name} class="office-contender-image"></img>
                    <div class="office-contender-info">
                        <h3>{props.name}</h3>
                        <div class="office">
                            {props.office}
                        </div>
                        <div class="office-contender-card-bottom">
                            <div class="office-contender-card-votes">
                                <div class="vote-progress-bar"></div>
                                <svg>
                                    <circle cx="29" cy="29" r="26" strokeDashoffset={vote_percentage_bar()}/>
                                </svg>
                                <p class="votes-percent">{votes_percentage()}<span>%</span></p>
                            </div>
                            <Link href={current_path+'/'+props.slug}>
                                <div class="office-contender-btn">
                                    <img src="../assets/icons/arrow-long-right.svg" alt="" class="icon-3"></img>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
    </>
}