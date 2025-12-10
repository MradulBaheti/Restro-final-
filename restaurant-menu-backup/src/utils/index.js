import { data } from "react-router-dom";

export const getRandomBG=()=>{

const colors =  ['#ffffff', '#3f2f1d', '#3357FF', '#1122ff'];
const color=colors[Math.floor(Math.random() * colors.length)];

return "bg-{" + color + "}" ;
}


export const getBgColor=()=>{

    const bgarr =  ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1'];
    const randomBg=Math.floor(Math.random() * bgarr.length);
    const color=bgarr[randomBg];
    return color ;
    }

    export const getAvatarName=(name)=>{
        if(!name) return "";
        return name.split(" ").map(word=>word[0]).join("").toUpperCase();
    }

   export const formatDate = (date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')}, ${date.getFullYear()}`;
     }

     export const formatDateAndTime=(date)=>{
        const dateAndTime=new Date(date).toLocaleString("en-US",{
          month:"long",
          day:"2-digit",
          year:"numeric",
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit",
          hour12:true,
          timeZone:"Asia/Kolkata"

        })
    return dateAndTime;

     }