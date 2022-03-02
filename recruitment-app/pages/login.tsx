import React, { useEffect, useState } from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
import { useDeno } from "aleph/react";

/**
 * The Login page with a login form.
 * @returns The Login screen component.
 */
export default function Login() {
  /*const [url, setUrl] = useState(undefined);

  useEffect(async ()=>{
    if(url){
      await fetch(url,{
        method: 'GET',
        mode: 'no-cors',
      })
      .then(response => response.json())
      .then(data => console.log(data));
    }
  },[url])
*/
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
    var new_url = "http://localhost:8000/user/validate/"+data.get("email")+"/"+data.get("password");
    await fetch(new_url)
    .then(response => response.text())
    .then(data => localStorage.setItem("JWT", data));
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