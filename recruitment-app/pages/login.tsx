import React, { FormEventHandler, useState } from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "~/components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
import { getAPI } from "../lib/api.ts";
export { ssr } from "~/lib/verification.ts";

/**
 * The Login page with a login form.
 * @returns The Login screen component.
 */
export default function Login({ user }: { user: any }) {
  useDeno(() => user);
  console.log(user ?? "user is undefined");
  const [error, setError] = useState("");

  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm: FormEventHandler = async function (event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const emailElm = document.getElementById("email") as HTMLInputElement;
    const passwordElm = document.getElementById("password") as HTMLInputElement;
    const password = passwordElm.value;
    const hashedPassword = hashPassword(password);

    //TODO: Make POST request instead (data as body)
    const res = await getAPI(
      `user/validate/${emailElm.value}/${hashedPassword}`
    );
    const jwt = await res.text();
    if (jwt) {
      document.cookie = `JWT=${jwt}`;
      window.location.href = "/";
    } else {
      passwordElm.value = "";
      setError("Wrong username or password, try again");
    }
  };

  return (
    <DefaultPage header="Login to site" user={user}>
      {(!user && (
        <>
          <form
            id="myForm"
            className="signup_form"
            encType="multipart/form-data"
            method="POST"
            onSubmit={submitForm}
          >
            Email:
            <label className="txt_field">
              <input id="email" type="email" name="email" />
            </label>
            Password:
            <label className="txt_field">
              <input id="password" type="password" name="password" />
            </label>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="button">
              Login
            </button>
          </form>
          <a href="/forgotPassword"> Forgot your password?</a>
        </>
      )) || (
        <>
          <p className="error-message">You are already logged in</p>
        </>
      )}
    </DefaultPage>
  );
}
