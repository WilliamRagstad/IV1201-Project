import React from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "~/components/defaultPage.tsx";
export { ssr } from "~/lib/verification.ts";
/**
 * The Home page
 * @returns The Home screen component.
 */
export default function Home({ user }: any) {
  useDeno(() => user);
  return (
    <DefaultPage header="" user={user}>
      <p>
        This is a site for sending in applications to a amusementpark and also
        letting admins view the applications and change their state.
      </p>
      <br />
      <p>
        {(user &&
          `Welcome ${user.firstName}, you have logged in as ${user.role.name}.`) ||
          "Please login by clicking at the link in the header"}
      </p>
      <br />
    </DefaultPage>
  );
}
