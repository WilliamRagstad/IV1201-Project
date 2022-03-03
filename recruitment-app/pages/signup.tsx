import React, { useEffect, useState } from "react";
import DefaultPage from "../components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";

/**
 * The signup page.
 * @returns a page with the form to register to the recruitment app.
 */
export default function Signup() {
  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm = function () {
    const password =
      (document.getElementById("password") as HTMLInputElement).value;
    const hashed = hashPassword(password);
    (document.getElementById("password") as HTMLInputElement).value = hashed;
  };

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

  return (
    <DefaultPage header="Sign up">
      {(title!="other")&&(<><p>Already signed in</p></>)||(title=="other")&&(<form
        action="http://localhost:8000/user"
        method="post"
        className="signup_form"
        encType="multipart/form-data"
        onSubmit={submitForm}
      >
        <div className="personal_information">
          First Name:
          <label className="txt_field">
            <input type="text" name="firstName" />
          </label>
          Last Name:
          <label className="txt_field">
            <input type="text" name="lastName" />
          </label>
          Person Number:
          <label className="txt_field">
            <input type="number" name="socialSecurityNumber" />
          </label>
          Email:
          <label className="txt_field">
            <input type="email" name="email" />
          </label>
          Username:
          <label className="txt_field">
            <input type="text" name="username" />
          </label>
          Password:
          <label className="txt_field">
            <input id="password" type="password" name="password" />
          </label>
        </div>

        <input type="submit" value="Sign Up" className="button" />
      </form>)}
    </DefaultPage>
  );
}
