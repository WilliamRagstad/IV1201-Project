import { useEffect } from 'react'
/**
 * Calls the API server to verify JWT.
 * Currently not used.
 * @param token The JWT
 * @returns The payload user data
 */
export default async function verifyTitle(token:(string|null)){
    if(token==null)
        return "other"
    useEffect(async ()=> {
         fetch("http://localhost:8000/user/verify/"+token+"/")
        .then((res) => res.json())
        .then(data => {
            console.log(data.user);
            return(data.user)
        })
        .catch(()=>{
            return {
                message: "other"
            }
        })
    })
}