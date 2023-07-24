import Link from "next/link";
import Image from "next/image";
import api_url from "../../../fecth_urls";
import ContestOffice from "./Contest_office";

export default function ContestHeader(props){
    const offices = props.offices;
    const offices_list = []

    for(let a in offices){
        offices_list.push(offices[a])
    }
    console.log('list',offices_list)
    return <>
        <section>
            <Image 
            src={api_url+props.image_link}
            style={{objectFit:'cover'}}
            width={1000}
            height={100}
            sizes="(max-width:600px) 50, 100vw"
            quality={10}
            alt="" 
            class="contest-banner"  />

        <div class="contest-info">
            <div>
                <h1>{props.name}</h1>
                <p>
                    {props.info}
                </p>
                <div class="contest-line"></div>
            </div>
            {offices_list.map(x=>{
                return(
                    <ContestOffice
                        candidates_list={x.candidate}
                        office_name = {x.office}
                        total_votes = {props.total_votes}
                    />
                )
            })}
        </div>
    </section>
    </>
}