import React, { useEffect, useState } from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
import { useDeno } from "aleph/react";

/**
 * The Login page with a login form.
 * @returns The Login screen component.
 */
export default function Login() {
  /**
   * Checks the users authorization
   */
   const [title, setTitle] = useState('other');
   useEffect(async ()=> {
     if(localStorage.length > 0 && title=="other"){
       await fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT")+"/")
         .then((res) => res.json())
         .then(data => setTitle(data.user))
         .catch(()=>{
           setTitle("other");
       })
     } 
   });

  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm = async function () {
    const password =
    (document.getElementById("password") as HTMLInputElement).value;
    const hashed = hashPassword(password);
    (document.getElementById("password") as HTMLInputElement).value = hashed;
    
    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('myForm') as HTMLFormElement | undefined)){
      data.append(pair[0], pair[1] as string);
    }
    //TODO: Make POST request instead (data as body)
    //TODO: Better error-handling
    await fetch("http://localhost:8000/user/validate/"+data.get("email")+"/"+data.get("password"))
    .then(response => response.text())
    .then(data => data!="" ? localStorage.setItem("JWT", data) : new Error())
    .catch(error => console.log(error));
  };

  return (
    <DefaultPage header="Login to site">
      <form
        id="myForm"
        className="signup_form"
        encType="multipart/form-data"
      >
        Email:
        <label className="txt_field">
          <input type="email" name="email" />
        </label>
        Password:
        <label className="txt_field">
          <input id="password" type="password" name="password" />
        </label>
        <a href="/"><button className="button" onClick={submitForm}>Login</button></a>
      </form>
    </DefaultPage>
  );
}