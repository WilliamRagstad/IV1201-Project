import React, { FormEventHandler, useState } from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "~/components/defaultPage.tsx";
export { ssr } from "~/lib/verification.ts";

/**
 * The Forgot Password page with a Reset password form.
 * @returns The Forgot Password screen component.
 */
export default function ForgotPassword({ user }: { user: any }) {
  useDeno(() => user);
  const [error, setError] = useState("");

  /**
   * Function to perform extra manipulation before sending formdata.
   */
  const submitForm: FormEventHandler = function (event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const emailElm = document.getElementById("email") as HTMLInputElement;
    console.log("Email sent to: " + emailElm.value);
    console.log("Link in email: " + window.location.href.replace("/forgotPassword", "") + "/passwordChange?email=" + emailElm.value)
  };

  return (
    <DefaultPage header="Forgot your password" user={user}>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="button">
              Reset password
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