import React from "react";
import DefaultPage from "../components/defaultpage.tsx";
import { createHash } from "https://deno.land/std@0.77.0/hash/mod.ts";

const hash = createHash("sha256");

/**
 * The signup page.
 * @returns a page with the form to register to the recruitment app.
 */
export default function Signup() {
  /**
   * Function to hash specified password.
   * @param password The password to hash.
   * @returns the hashed password.
   */
  function hashPassword(password: string) {
    hash.update(password);
    const hashed = hash.toString();
    return hashed;
  }
  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm = function () {
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const hashed = hashPassword(password);
    (document.getElementById("password") as HTMLInputElement).value = hashed;
  }
  
  return (
    <DefaultPage header="Sign up">
      <form
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

        <input type="submit" value="Sign Up" className="button"/>
      </form>
    </DefaultPage>
  );
}
