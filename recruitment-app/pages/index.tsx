import React from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { useDeno } from "aleph/react";

/**
 * The Home page
 * @returns The Home screen component.
 */
export default function Home() {
  console.log(localStorage.getItem("JWT"));
  const test = useDeno(
    async () =>
      await fetch("http://localhost:8000/user/verify/"+localStorage.getItem("JWT"))
        .then((res) => res.json())
        .catch((error) => {
          return {
            message: "No connection to the whatever, try again later.",
          };
        })
  );
  console.log(test);

  return (
    <DefaultPage header="">
      <p>
        This is a site for sending in applications to a amusementpark and also letting admins view the applications and change their state.
      </p>
    </DefaultPage>
  );
}
