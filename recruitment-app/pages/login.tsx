import React from "react";
import DefaultPage from "~/components/defaultpage.tsx";
import { hashPassword } from "../lib/passhash.ts";

/**
 * The Login page with a login form.
 * @returns The Login screen component.
 */
export default function Login() {
  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm = function () {
    const password =
    (document.getElementById("password") as HTMLInputElement).value;
    const hashed = hashPassword(password);
    (document.getElementById("password") as HTMLInputElement).value = hashed;
  };
  return (
    <DefaultPage header="Login to site">
      <form
        action="http://localhost:8000/user/validate"
        method="post"
        className="signup_form"
        encType="multipart/form-data"
        onSubmit={submitForm}
      >
        Email:
        <label className="txt_field">
          <input type="email" name="email" />
        </label>
        Password:
        <label className="txt_field">
          <input id="password" type="password" name="password" />
        </label>
        <input type="submit" value="Login" className="button" />
      </form>
    </DefaultPage>
  );
}