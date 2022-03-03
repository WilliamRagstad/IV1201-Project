import { useEffect, useState } from 'react'

/**
 * Verifies the users JWT to check authorization privileges. 
 * @returns The users role title. 
 */
export const useVerify = () => {
    const [title, setTitle] = useState("other");
    useEffect(()=> {
        if(localStorage.length > 0 && title=="other"){
          fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT")+"/")
            .then((res) => {
              if(!res.ok)
                throw Error(res.statusText);
              else
                return res.json()
            })
            .then(data => setTitle(data.user))
            .catch((error)=>{
              setTitle("other");
          })
        } 
      });
    return title;
};
