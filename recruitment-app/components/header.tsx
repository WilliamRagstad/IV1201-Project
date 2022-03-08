import React, { useEffect, useState } from "react";
import Logo from "~/components/logo.tsx";
import { deleteAllCookies } from "~/lib/cookies.ts";

/**
 * Creates a header to use on the webpage.
 * @param user prop for the user that is logged in.
 * @returns The created header.
 */
export default function Header({ user }: any) {
  const logout = (
    <a
      href="/"
      onClick={() => {
        deleteAllCookies();
        window.location.href = "/";
      }}
    >
      Logout
    </a>
  );

  return (
    <div className="header">
      <p className="logo">
        <Logo />
      </p>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        {(user && user.role.name === "applicant")
        // If the user is an applicant, show the job page.
          ? (
            <>
              <a href="/job">Apply for Job</a>
              <span></span>
              {logout}
            </>
          )
          : (user && user.role.name === "recruiter")
          // If the user is a recruiter, show the application page.
          ? (
            <>
              <a href="/applications">See applications</a>
              <span></span>
              {logout}
            </>
          )
          : (
            // Else show the login and signup pages.
            <>
              <a href="/login">Login</a>
              <span></span>
              <a href="/signup">Sign Up</a>
            </>
          )}
      </p>
    </div>
  );
}
