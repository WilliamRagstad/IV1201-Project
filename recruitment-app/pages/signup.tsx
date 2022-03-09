import React, { useEffect, useState } from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "../components/defaultPage.tsx";
import { hashPassword } from "../lib/passhash.ts";
export { ssr } from "~/lib/verification.ts";

/**
 * The signup page.
 * @returns a page with the form to register to the recruitment app.
 */
export default function Signup({ user }: any) {
  useDeno(() => user);
  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm = function () {
    const passwordElm = document.getElementById("password") as HTMLInputElement;
    const password = passwordElm.value;
    const hashedPassword = hashPassword(password);
    passwordElm.value = hashedPassword;
  };

  return (
    <DefaultPage header="Sign up" user={user}>
      {(!user && (
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

          <input type="submit" value="Sign Up" className="button" />
        </form>
      )) || (
        <>
          <p className="error-message">Already signed in</p>
        </>
      )}
    </DefaultPage>
  );
}
