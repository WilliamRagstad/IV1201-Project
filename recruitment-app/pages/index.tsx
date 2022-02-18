import React from "react";
import DefaultPage from "~/components/defaultpage.tsx";
import { createHash } from "https://deno.land/std@0.77.0/hash/mod.ts";

const hash = createHash("sha256");

/**
 * The Home page with a login screen.
 * @returns The Login screen component.
 */
export default function Home() {
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
    const password =
    (document.getElementById("password") as HTMLInputElement).value;
    const hashed = hashPassword(password);
    (document.getElementById("password") as HTMLInputElement).value = hashed;
  };
  //Check if user is logged in and return proper page and if not return log in page
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
