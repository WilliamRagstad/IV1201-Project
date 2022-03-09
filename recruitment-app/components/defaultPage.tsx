import React from "react";
import Header from "~/components/header.tsx";
import Footer from "~/components/footer.tsx";
import "../style/index.css";

/**
 * Creates a default webpage with specified dom-elements as children.
 * @param header The header to show on the page.
 * @param user The user that is currently logged in.
 * @param children The children-elements to place inside the defaultpage
 * @returns The default webpage with specified children-elements and header.
 */
export default function DefaultPage(
  { header, user, children }: {
    header: string;
    user: any;
    children: React.ReactNode;
  },
) {
  return (
    <div className="page">
      <Header user={user}></Header>
      <head>
        <title>Amusement Park Recruiting</title>
      </head>
      <h1>
        Welcome to <strong>Amusement Park Recruiting</strong>!
      </h1>
      <h2>{header}</h2>
      {children}
      <Footer></Footer>
    </div>
  );
}
