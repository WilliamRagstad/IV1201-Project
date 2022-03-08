// deno-lint-ignore-file no-explicit-any
import React, { useEffect, useState } from "react";
import DefaultPage from "~/components/defaultPage.tsx";
import { useDeno } from "aleph/react";
export { ssr } from "~/lib/verification.ts";

/**
 * The admin page for recruiters to see the applications
 * @returns A page with applications
 */
export default function Application({ user }: any) {
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
  const [currentApplication, setCurrentApplication]: [any, any] =
    useState(null);
  const [currentPageApplications, setCurrentPageApplications] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    competence: -1,
    availability: {
      from: -1,
      to: -1,
    },
  });

  /**
   * UseEffect for updating shown user list when page is changed.
   */
  useEffect(() => {
    if (!userData || userData.message || userData.length === 0) return;
    if (currentApplication === null) setCurrentApplication(userData[0]);

    if (pageIndex < 0) {
      setPageIndex(0);
      return;
    }
    const searchedUsers = userData.filter((application: any) => {
      // Filter all users that satisfy the search criteria
      if (
        searchCriteria.name &&
        searchCriteria.name.length &&
        !(
          application.user.firstName.toLowerCase() +
          " " +
          application.user.lastName.toLowerCase()
        ).includes(searchCriteria.name.toLowerCase())
      ) {
        return false;
      }
      if (
        searchCriteria.competence !== -1 &&
        !application.competences.some(
          (c: any) => c.id === searchCriteria.competence
        )
      ) {
        return false;
      }
      if (
        searchCriteria.availability.from !== -1 &&
        searchCriteria.availability.to !== -1 &&
        !application.availability.some(
          (a: any) =>
            Date.parse(a.start_date) >= searchCriteria.availability.from &&
            Date.parse(a.end_date) <= searchCriteria.availability.to
        )
      ) {
        return false;
      }
      return true;
    });
    if (pageIndex > Math.floor(searchedUsers.length / applications_per_page)) {
      setPageIndex(pageIndex - 1);
      return;
    }

    setCurrentPageApplications(
      searchedUsers.filter(
        (a: any, i: number) =>
          i < pageIndex * applications_per_page + applications_per_page &&
          i >= pageIndex * applications_per_page
      )
    );
    setCurrentApplication(searchedUsers[0]);
  }, [userData, searchCriteria, pageIndex]);

  /**
   * Function to update search criteria.
   */
  function updateSearchCriteria() {
    const name: string = (
      document.getElementById("search_name") as HTMLInputElement
    ).value.toLowerCase();
    const competence: number = Number.parseInt(
      (document.getElementById("search_competence") as HTMLSelectElement).value
    );
    let availability_from: number = Date.parse(
      (document.getElementById("from_date") as HTMLInputElement).value
    );
    let availability_to: number = Date.parse(
      (document.getElementById("to_date") as HTMLInputElement).value
    );
    if (isNaN(availability_from)) {
      availability_from = -1;
    }
    if (isNaN(availability_to)) {
      availability_to = -1;
    }
    setSearchCriteria({
      name: name,
      competence: competence,
      availability: {
        from: availability_from,
        to: availability_to,
      },
    });
    setPageIndex(0);
  }

  /**
   * Lists the competence ID to its corresponding competence
   * @param i The Competence ID
   * @returns The competence
   */
  function listCompetence(comp: any) {
    switch (comp.id) {
      case 1:
        return (
          "Ticket Sales " + comp.years_of_experience + " Years of experience"
        );
      case 2:
        return "Lotteries " + comp.years_of_experience + " Years of experience";
      case 3:
        return (
          "Roller Coaster Operation " +
          comp.years_of_experience +
          " Years of experience"
        );
      default:
        return "Unknown competence";
    }
  }

  return (
    <DefaultPage header="View Applications" user={user}>
      {
        userData.message ? (
          <h2 className="error-message">{userData.message}</h2>
        ) : user && user.role.name === "recruiter" ? (
          <>
            <div className="search flex-parent">
              <div className="flex-child">
                <label className="txt_field" htmlFor="search_name">
                  Search for name:
                </label>
                <input
                  type="text"
                  id="search_name"
                  onChange={updateSearchCriteria}
                />
              </div>
              <div className="flex-child">
                <label className="txt_field" htmlFor="search_competence">
                  Search for competence:
                </label>
                <select id="search_competence" onChange={updateSearchCriteria}>
                  <option value="-1">All</option>
                  <option value="1">Ticket Sales</option>
                  <option value="2">Lotteries</option>
                  <option value="3">Roller Coaster Operation</option>
                </select>
              </div>
              <div className="flex-child">
                <label htmlFor="from_date">Available between dates:</label>
                <input
                  type="date"
                  id="from_date"
                  onChange={updateSearchCriteria}
                />
                <label htmlFor="to_date">and:</label>
                <input
                  type="date"
                  id="to_date"
                  onChange={updateSearchCriteria}
                />
              </div>
              <input
                className="button"
                type="button"
                value="Search"
                onClick={updateSearchCriteria}
              />
            </div>
            {(currentPageApplications.length > 0 && (
              <>
                <div className="applications">
                  <ul className="user_list">
                    {currentPageApplications.map((app: any, i) => (
                      <li
                        className="user_box"
                        onClick={() => setCurrentApplication(app)}
                        key={"u" + i}
                      >
                        {app.user.firstName + " " + app.user.lastName}
                      </li>
                    ))}
                  </ul>
                  {currentApplication && (
                    <div className="application_page">
                      <div>
                        <p>
                          Name:{" "}
                          {currentApplication.user.firstName +
                            " " +
                            currentApplication.user.lastName}
                        </p>
                        <p>Email: {currentApplication.user.email}</p>
                        <ul className="application_list">
                          Availability periods:
                          {currentApplication.availability.map(
                            (availability: any, i: number) => (
                              <li key={"d" + i} className="list_box">
                                {new Date(
                                  availability.start_date
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(
                                  availability.end_date
                                ).toLocaleDateString()}
                              </li>
                            )
                          )}
                        </ul>
                        <ul className="application_list">
                          Competences:
                          {currentApplication.competences.map(
                            (comp: any, i: number) => (
                              <li key={"c" + i} className="list_box">
                                {listCompetence(comp)}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
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
            )) || (
              <h2 className="error-message">
                No users matching search criteria
              </h2>
            )}
          </>
        ) : (
          <p className="error-message">Error 401 - Unauthorized</p>
        ) //! TODO: Don't manage routing in page components!!!
      }
    </DefaultPage>
  );
}
