import React from "react";
import DefaultPage from "~/components/defaultPage.tsx";

/**
 * The Home page
 * @returns The Home screen component.
 */
export default function Home() {
  return (
    <DefaultPage header="">
      <p>
        This is a site for sending in applications to a amusementpark and also letting admins view the applications and change their state.
      </p>
    </DefaultPage>
  );
}
