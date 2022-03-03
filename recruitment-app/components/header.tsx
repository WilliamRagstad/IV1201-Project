import React, { useEffect, useState } from "react";
import Logo from "~/components/logo.tsx";
import {useVerify} from "../lib/verification.ts"
/**
 * Creates a header to use on the webpage.
 * @returns The created header.
 */
export default function Header() {
  /**
   * Checks the users authorization
   */
  const title = useVerify();

  return (
    <div className="header">
      <p className="logo">
        <Logo />
      </p>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        {(title==="other") && (<><a href="/login">Login</a><span></span></>)}
        {(title==="other") && (<><a href="/signup">Sign Up</a></>)}
        {(title==="applicant") && (<><a href="/job">Apply for Job</a><span></span></>)}
        {(title==="recruiter") && (<><a href="/application">See applications</a><span></span></>)}
        {(title!=="other") && (<><a href="/" onClick={()=>{localStorage.clear();window.location.href="/";}}>Logout</a></>)}
      </p>
    </div>
  );
}
