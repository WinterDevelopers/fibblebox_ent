export default function notification_message(type, information){
//type = [info, success, warning, error]
//information message to show the user
const closeMessage = ()=>{
    document.querySelector("#message-container").innerHTML=""
}

const messageClass = type+"-message";

if(typeof window !== "undefined"){
    const message_container = document.querySelector("#message-container");
    message_container.innerHTML = `<div class=${messageClass} id="notification-message">
                                    <span>
                                        ${information}
                                    </span>
                                    <span id="close-message">
                                        <img src="../../assets/icons/close-circle.svg" class="icon-2" />
                                    </span>
                                 </div>`
    };
    const close_message = document.querySelector("#close-message");
    close_message.addEventListener("click",()=>{closeMessage()});

}