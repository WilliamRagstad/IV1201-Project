import React, { useState } from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
import { fetchJWTAuthorization } from "../lib/verification.ts"
const title = await fetchJWTAuthorization();

/**
 * The Login page with a login form.
 * @returns The Login screen component.
 */
export default function Login() {
  const [error, setError] = useState("");

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
    await fetch("http://localhost:8000/user/validate/"+data.get("email")+"/"+data.get("password"))
    .then(response => response.text())
    .then(data => {
      if(data){
        localStorage.setItem("JWT", data);
        window.location.href="/";
      } else{
        (document.getElementById("password") as HTMLInputElement).value = ""
        setError("Wrong username or password, try again");
      }
    })
    .catch(error => console.log("Try Again"));
  };

  return (
    <DefaultPage header="Login to site">
      {(title==="other")&&(<><form
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
      </form>
      <button className="button" onClick={submitForm}>Login</button></>)
      ||(<><p>Already logged in</p></>)}
    </DefaultPage>
  );
}