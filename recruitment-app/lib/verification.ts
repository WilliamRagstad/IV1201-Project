/**
 * Verifies the users JWT to check authorization privileges. 
 * @returns The users role title. 
 */
export const fetchJWTAuthorization = async () => {
    var title="other";
      if(localStorage.length > 0 && title=="other"){
        await fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT")+"/")
          .then((res) => {
            if(!res.ok)
              throw Error(res.statusText);
            else
              return res.json()
          })
          .then(data => {
            if(data.user==1)
              title="recruiter";
            else if(data.user==2)
              title="applicant";
          })
          .catch((error)=>{
            title="other";
        })
      } 
    return title;
};
