import OfficeCandidate from "./Contest_Candidate"

export default function ContestOffice(props){
    const candidates = props.candidates_list;
 
    return<>
        <section>
        <div class="contest-office">
                <div class="contest-office-headers">
                    <div>{props.office_name}</div>
                    <div class="drop-down btn-shadow ">
                        <img src="../assets/icons/arrow.svg" alt="" class="icon-2"></img>
                    </div>
                </div>
            </div>
            <div class="office-contenders">
                {candidates.map(x=>{
                    return(
                        <OfficeCandidate
                            key={x.id}
                            slug={x.slug}
                            name={x.name}
                            votes={x.votes}
                            total_votes = {props.total_votes}
                            office={props.office_name}
                            image_link = {x.personal_image}
                        />
                    )
                })}
            </div>
        </section>
    </>
}