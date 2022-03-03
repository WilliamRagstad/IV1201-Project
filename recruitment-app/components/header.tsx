import React, { useEffect, useState } from "react";
import Logo from "~/components/logo.tsx";
/**
 * Creates a header to use on the webpage.
 * @returns The created header.
 */
export default function Header() {
  /**
   * Checks the users authorization
   */
  const [title, setTitle] = useState('other');
  useEffect(async ()=> {
    if(localStorage.length > 0 && title=="other"){
      await fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT")+"/")
        .then((res) => res.json())
        .then(data => {setTitle(data.user)})
        .catch(()=>{
          setTitle("other");
      })
    } 
  });

  return (
    <div className="header">
      <p className="logo">
        <Logo />
      </p>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        {(title==="other") && (<><a href="/login">Login</a><span></span></>)}
        {(title==="other") && (<><a href="/signup">Sign Up</a></>)}
        {(title==="applicant") && (<><a href="/job">Apply for Job</a><span></span></>)}
        {(title==="recruiter") && (<><a href="/application">See applications</a><span></span></>)}
        {(title!=="other") && (<><a href="/" onClick={()=>{localStorage.clear();window.location.reload()}}>Logout</a></>)}
      </p>
    </div>
  );
}
