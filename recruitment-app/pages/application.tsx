import React, { useEffect, useState } from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { useDeno } from "aleph/react";

/**
 * The admin page for recruiters to see the applications
 * @returns A page with applications
 */
export default function Application() {
  //TODO: Check if user is logged in and return proper page and if not return log in page

  /**
   * Retrieves and formats the user data.
   */
  const userData = useDeno(
    async () =>
      await fetch("http://localhost:8000/application")
        .then((res) => res.json())
        .catch((error) => {
          return {
            message: "No connection to the API, try again later.",
          };
        })
  );

  const applications_per_page = 6;
  const [pageIndex, setPageIndex] = useState(0);
  // deno-lint-ignore no-explicit-any ban-types
  const [currentUser, setCurrentUser]: [any, Function] = useState(null);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    competence: -1,
    availability: {
      from: -1,
      to: -1,
    },
  });

  useEffect(() => {
    if (userData.message || !userData || userData.length === 0) return;
    if (currentUser === null) setCurrentUser(userData[0]);

    if (pageIndex < 0) setPageIndex(0);

    const searchedUsers = userData
      // deno-lint-ignore no-explicit-any
      .filter((user: any) => {
        // Filter all users that satisfy the search criteria
        if (
          searchCriteria.name &&
          searchCriteria.name.length &&
          user.name.toLowerCase().includes(searchCriteria.name.toLowerCase())
        )
          return false;
        if (
          searchCriteria.competence !== -1 &&
          !user.competence.some(
            ([id, _]: [number, number]) => id === searchCriteria.competence
          )
        )
          return false;
        if (
          searchCriteria.availability.from !== -1 &&
          user.availability.from < searchCriteria.availability.from
        )
          return false;
        if (
          searchCriteria.availability.to !== -1 &&
          user.availability.to > searchCriteria.availability.to
        )
          return false;
        return true;
      });

    if (pageIndex > Math.floor(searchedUsers.length / applications_per_page))
      setPageIndex(pageIndex - 1);

    setCurrentPageUsers(
      searchedUsers.filter(
        // deno-lint-ignore no-explicit-any
        (u: any, i: number) =>
          i < pageIndex + applications_per_page && i >= pageIndex
      )
    );
  }, [userData, searchCriteria, pageIndex]);

  /**
   * Function to update shown users.
   */
  function updateSearchCriteria() {
    const name: string = (
      document.getElementById("search_name") as HTMLInputElement
    ).value.toLowerCase();
    const competence: number = Number.parseInt(
      (document.getElementById("search_competence") as HTMLSelectElement).value
    );
    const availability_from: number = Date.parse(
      (document.getElementById("from_date") as HTMLInputElement).value
    );
    const availability_to: number = Date.parse(
      (document.getElementById("to_date") as HTMLInputElement).value
    );
    setSearchCriteria({
      name: name,
      competence: competence,
      availability: {
        from: availability_from,
        to: availability_to,
      },
    });
  }

  /**
   * Lists the competence ID to its corresponding competence
   * @param i The Competence ID
   * @returns The competence
   */
  function listCompetence([id, experience]: [number, number]) {
    switch (id) {
      case 1:
        return "Ticket Sales " + experience + " Years of experience";
      case 2:
        return "Lotteries " + experience + " Years of experience";
      case 3:
        return (
          "Roller Coaster Operation " + experience + " Years of experience"
        );
      default:
        return "Unknown competence";
    }
  }

  return (
    <DefaultPage header="View Applications">
      {(userData.message && <h2 className="error-message">{userData.message}</h2>) || (
        <>
          <div className="search flex-parent">
            <div className="flex-child">
              <label className="txt_field" htmlFor="search_name">
                Search for name:
              </label>
              <input type="text" id="search_name" />
            </div>
            <div className="flex-child">
              <label className="txt_field" htmlFor="search_competence">
                Search for competence:
              </label>
              <select id="search_competence">
                <option value="-1">All</option>
                <option value="1">Ticket Sales</option>
                <option value="2">Lotteries</option>
                <option value="3">Roller Coaster Operation</option>
              </select>
            </div>
            <div className="flex-child">
              <label htmlFor="from_date">Available between dates:</label>
              <input type="date" id="from_date" />
              <label htmlFor="to_date">and:</label>
              <input type="date" id="to_date" />
            </div>
            <input
              className="button"
              type="button"
              value="Search"
              onClick={updateSearchCriteria}
            />
          </div>

          <div className="applications">
            <ul className="user_list">
              {currentPageUsers.map((element: any, i) => (
                <li
                  className="user_box"
                  onClick={() => setCurrentUser(element)}
                  key={"u" + i}
                >
                  {element.name}
                </li>
              ))}
            </ul>
            <div className="application_page">
              {currentUser && (
                <div>
                  <p>Name: {currentUser.name}</p>
                  <p>Email: {currentUser.email}</p>
                  <ul className="application_list">
                    Availability periods:
                    {currentUser.start.map((comp: Date[], i: number) => (
                      <li key={"d" + i} className="list_box">
                        {comp} to {currentUser.end[i]}
                      </li>
                    ))}
                  </ul>
                  <ul className="application_list">
                    Competences:
                    {currentUser.competences.map(
                      (comp: [number, number], i: number) => (
                        <li key={"c" + i} className="list_box">
                          {listCompetence(comp)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="user_arrow_box">
            <li
              className="user_arrow"
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous Page
            </li>
            <li
              className="user_arrow"
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next Page
            </li>
          </div>
        </>
      )}
    </DefaultPage>
  );
}
