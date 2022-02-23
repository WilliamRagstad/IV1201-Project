import React from "react";
import Logo from "~/components/logo.tsx";

/**
 * Creates a header to use on the webpage.
 * @returns The created header.
 */
export default function Header() {
  //If logged in, dont show sign up
  return (
    <div className="header">
      <p className="logo">
        <Logo />
      </p>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        <a href="/login">Login</a>
        <span></span>
        <a href="/signup">Sign Up</a>
        <span></span>
        <a href="/job">Apply for Job</a>
        <span></span>
        <a href="/application">See applications</a>
      </p>
    </div>
  );
}
