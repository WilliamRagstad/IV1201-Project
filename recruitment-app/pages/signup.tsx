import React, { FormEventHandler, useState } from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "../components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
export { ssr } from "~/lib/verification.ts";
import { getAPI } from "../lib/api.ts";


/**
 * The signup page.
 * @returns a page with the form to register to the recruitment app.
 */
export default function Signup({ user }: any) {
  useDeno(() => user);
  const [error, setError] = useState("");
  /**
   * Function to perform extra manipulation before sending formdata.
   */
   const submitForm: FormEventHandler = async function (event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const passwordElm = document.getElementById("password") as HTMLInputElement;
    const password = passwordElm.value;
    const hashedPassword = hashPassword(password);
    passwordElm.value = hashedPassword;
    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('signup_form_data') as HTMLFormElement | undefined)){
      data.append(pair[0], pair[1] as string);
    }
    const res = await getAPI('user', {
      method: 'POST',
      body: data,
    });
    const jwt = await res.text();
    if(jwt && res.status==201){
      document.cookie = `JWT=${jwt}`;
      window.location.href = "/";
    }
    else{
      passwordElm.value = "";
      setError("Something went wrong, try again");
    }
  };

  return (
    <DefaultPage header="Sign up" user={user}>
      {(!user && (
        <form
          className="signup_form"
          encType="multipart/form-data"
          onSubmit={submitForm}
          id="signup_form_data"
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
          {error && <p className="error-message">{error}</p>}
          <input type="submit" value="Sign Up" className="button" />
        </form>
      )) || (
        <>
          <p className="error-message">You are already logged in</p>
        </>
      )}
    </DefaultPage>
  );
}
