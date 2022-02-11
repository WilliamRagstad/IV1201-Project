import React from "react";

/**
 * Creates a footer for the webpage.
 * @returns The created footer.
 */
export default function Footer() {
  return (
    <div className="footer">
      <p className="links">
        <a href="https://www.kth.se/" target="_blank">Created at KTH</a>
        <span></span>
        <a href="/about">About Us</a>
        <span></span>
        <a
          href="https://github.com/WilliamRagstad/IV1201-Project"
          target="_blank"
        >
          Github
        </a>
      </p>
    </div>
  );
}
