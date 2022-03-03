import { useEffect, useState } from 'react'

export const useVerify = () => {
    const [title, setTitle] = useState("other");
    console.log("TEST");
    useEffect(()=> {
        if(localStorage.length > 0 && title=="other"){
          fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT")+"/")
            .then((res) => res.json())
            .then(data => setTitle(data.user))
            .catch(()=>{
              setTitle("other");
          })
        } 
      });
    return title;
};
