import React, { FormEventHandler, useState } from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "~/components/defaultPage.tsx";
import { hashPassword, Salt } from "../lib/passhash.ts";
import { getAPI } from "../lib/api.ts";
export { ssr } from "~/lib/verification.ts";

/**
 * The Change password page with a password changing form.
 * @returns The Change password screen component.
 */
export default function PasswordChange({ user }: { user: any }) {
  useDeno(() => user);
  const [error, setError] = useState("");

  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm: FormEventHandler = async function (event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const password1Elm = document.getElementById(
      "password1",
    ) as HTMLInputElement;
    const password2Elm = document.getElementById(
      "password2",
    ) as HTMLInputElement;
    const password = password1Elm.value;
    
    if (password == password2Elm.value) {
      const hashedPassword = hashPassword(password + Salt);
      const email: string = window.location.href.split("?")[1].split("=")[1];
      const res = await getAPI(
        `user/password/${email}/${hashedPassword}`,
      );
      if (res.ok) {
        window.location.href = "/login";
      } else {
        password1Elm.value = "";
        password2Elm.value = "";
        setError("Something went wrong!, try again");
      }
    } else {
      password1Elm.value = "";
      password2Elm.value = "";
      setError("Passwords don't match");
    }
  };

  return (
    <DefaultPage header="Set new password" user={user}>
      {(!user && (
        <>
          <form
            id="myForm"
            className="signup_form"
            encType="multipart/form-data"
            method="POST"
            onSubmit={submitForm}
          >
            Password:
            <label className="txt_field">
              <input id="password1" type="password" name="password1" />
            </label>
            Confirm Password:
            <label className="txt_field">
              <input id="password2" type="password" name="password2" />
            </label>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="button">
              Set Password
            </button>
          </form>
        </>
      )) || (
        <>
          <p className="error-message">You are already logged in</p>
        </>
      )}
    </DefaultPage>
  );
}
