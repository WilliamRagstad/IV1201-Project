import React, { useEffect, useState } from "react";
import DefaultPage from "~/components/defaultpage.tsx";
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
  const userData: {
    person_id: number;
    name: string;
    start: Date[];
    end: Date[];
    competences: number[][];
    email: string;
  }[] = useDeno(async () => {
    var response_data = await fetch(`http://localhost:8000/application`)
      .then((res) => res.json()).catch(() => [{
        email: "No connection to the server",
        name: "Retry again later",
        start: ["From a moment ago"],
        end: ["Until it works again"],
        competences: [],
      }]);
    console.log(response_data);
    return response_data;
  });
  const [searchName, setSearchName] = useState("");
  const [searchCompetence, setSearchCompetence] = useState(1);
  const [searchFromDate, setSearchFromDate] = useState(new Date());
  const [searchToDate, setSearchToDate] = useState(new Date());
  const applications_per_page = 6;
  const [user, setUser] = useState(userData[0]);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);

  useEffect(() => {
    setCurrentPageUsers()
  }, [userData, pageIndex])

  /**
   * Function to filter shown users.
   */
  function searchUsers() {
    console.log(
      searchName + " | " + searchCompetence + " | " + searchFromDate + " | " +
        searchToDate,
    );
    const filterFn = ((
      user: {
        name: string;
        competences: number[][];
        start: Date[];
        end: Date[];
      },
    ) =>
      user.name.toLowerCase().includes(searchName) &&
      user.competences.some((comp: number[]) => comp[0] == searchCompetence) &&
      user.start.some((
        start: Date,
        i: number,
      ) => (start >= searchFromDate &&
        user.end[i] <= searchToDate)
      ));
    const pass = userData.filter(filterFn);
    setSearchedUsers(pass);
    setPageIndex(0);
    prevPage();
  }

  /**
   * Selects the previous page indice for the list.
   */
  function prevPage() {
    var prev = (index - applications_per_page < 0)
      ? 0
      : index - applications_per_page;
    setIndex(prev);
    setFilteredUsers(
      searchedUsers.filter((
        element: any,
        i: number,
      ) => (i < (prev + applications_per_page) && i >= prev)),
    );
  }

  /**
   * Selects the next page indice for the list.
   */
  function nextPage() {
    var next = (index + applications_per_page > searchedUsers.length)
      ? index
      : index + applications_per_page;
    setIndex(next);
    setFilteredUsers(
      searchedUsers.filter((
        element: JSON,
        i: number,
      ) => (i < (next + applications_per_page) && i >= next)),
    );
  }

  /**
   * Lists the selected users.
   */
  const listUsers = filteredUsers.map((
    element: {
      name: string;
    },
    i: string,
  ) => (
    <li
      className="user_box"
      onClick={() => setUser(element)}
      key={"u" + i}
    >
      {element.name}
    </li>
  ));

  /**
   * Lists the competence ID to its corresponding competence
   * @param i The Competence ID
   * @returns The competence
   */
  function listCompetence(i: number[]) {
    switch (i[0]) {
      case (1 || "A"): {
        return "Ticket Sales " + i[1] + " Years of experience";
      }
      case 2 || "B": {
        return "Lotteries " + i[1] + " Years of experience";
      }
      case 3 || "C": {
        return "Roller Coaster Operation " + i[1] + " Years of experience";
      }
      default: {
        return "";
      }
    }
  }

  /**
   * Shows full information about the selected user.
   */
  const currentApplication = (
    <div>
      <p>
        Name: {user.name}
      </p>
      <p>
        Email: {user.email}
      </p>
      <ul className="application_list">
        Availability periods:{" "}
        {user.start.map((comp: Date, i: number) => (
          <li key={"d" + i} className="list_box">
            {comp.toLocaleDateString()} to {user.end[i].toLocaleDateString()}
          </li>
        ))}
      </ul>
      <ul className="application_list">
        Competences:{" "}
        {user.competences.map((comp: number[], i: number) => (
          <li key={"c" + i} className="list_box">{listCompetence(comp)}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <DefaultPage header="View Applications">
      <div className="search flex-parent">
        <div className="flex-child">
          <label className="txt_field" htmlFor="search_name">
            Search for name:
          </label>
          <input
            type="text"
            id="search_name"
            onChange={setSearchName(
              (document.getElementById("search_name") as HTMLInputElement)
                .value,
            )}
          />
        </div>
        <div className="flex-child">
          <label className="txt_field" htmlFor="search_competence">
            Search for competence:
          </label>
          <select
            id="search_competence"
            onChange={setSearchCompetence(
              Number.parseInt(
                (document.getElementById(
                  "search_competence",
                ) as HTMLSelectElement).value,
              ),
            )}
          >
            <option value="1">Ticket Sales</option>
            <option value="2">Lotteries</option>
            <option value="3">Roller Coaster Operation</option>
          </select>
        </div>
        <div className="flex-child">
          <label htmlFor="search_from_date">Available between dates:</label>
          <input
            type="date"
            id="search_from_date"
            defaultValue={new Date().toLocaleDateString()}
            onChange={setSearchFromDate(
              new Date(
                (document.getElementById(
                  "search_from_date",
                ) as HTMLInputElement).value,
              ),
            )}
          />
          <label htmlFor="search_to_date">and:</label>
          <input
            type="date"
            id="search_to_date"
            defaultValue={new Date().toLocaleDateString()}
            onChange={setSearchToDate(
              new Date(
                (document.getElementById("search_to_date") as HTMLInputElement)
                  .value,
              ),
            )}
          />
        </div>
        <input
          className="button"
          type="button"
          value="Search"
          onClick={searchUsers}
        />
      </div>
      <div className="applications">
        <ul className="user_list">{listUsers}</ul>
        <div className="application_page">
          {currentApplication}
        </div>
      </div>
      <div className="user_arrow_box">
        <li className="user_arrow" onClick={prevPage}>Previous Page</li>
        <li className="user_arrow" onClick={nextPage}>Next Page</li>
      </div>
    </DefaultPage>
  );
}
