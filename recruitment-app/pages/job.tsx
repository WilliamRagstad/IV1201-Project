import React from "react";
import { useDeno } from "aleph/react";
import DefaultPage from "~/components/defaultPage.tsx";
export { ssr } from "~/lib/verification.ts";

/**
 * The Job page to apply for work.
 * @returns A page with the forms to select work competence and the availability dates.
 */
export default function Job({ user }: any) {
  useDeno(() => user);

  return (
    <DefaultPage header="Apply for work here" user={user}>
      {user && user.role.name === "applicant" ? (
        <form action="/" method="post" className="signup_form flex-parent">
          <div>
            <h2>Choose your expertise</h2>
            <div className="flex-parent">
              <div>
                <input
                  className="check_box"
                  type="checkbox"
                  name="expertise1"
                  id="expertise1"
                />
                <label htmlFor="expertise1">Ticket sales</label>
              </div>
              <div>
                <input
                  className="check_box"
                  type="checkbox"
                  name="expertise2"
                  id="expertise2"
                />
                <label htmlFor="expertise2">Lotteries</label>
              </div>
              <div>
                <input
                  className="check_box"
                  type="checkbox"
                  name="expertise3"
                  id="expertise3"
                />
                <label htmlFor="expertise3">Roller coaster operation</label>
              </div>
            </div>
          </div>
          <div className="availability_dates">
            <h2>Dates for work:</h2>
            <div className="flex-parent">
              <div>
                <label htmlFor="startdate">From:</label>
                <input type="date" name="startdate" id="startdate" />
              </div>
              <div>
                <label htmlFor="enddate">To:</label>
                <input type="date" name="enddate" id="enddate" />
              </div>
            </div>
            <input type="submit" value="Apply" className="button" />
          </div>
          </form>
        )
        : (
          <>
            <p className="error-message">You are not authorized to view this page</p>
          </>
        )
      }
    </DefaultPage>
  );
}
