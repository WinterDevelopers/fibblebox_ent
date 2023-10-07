import notification_message from "./message_function";

export default function dontSubmit(e){
    e.preventDefault();
    notification_message("warning","Form is still processing or is now invalid  ")
}