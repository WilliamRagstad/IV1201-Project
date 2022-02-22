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
  const userData = useDeno(async () => {
    try {
      var response_data: any;
      await fetch(`http://localhost:8000/application`)
        .then((res) => res.text())
        .then((data) => response_data = JSON.parse(data));
      return response_data;
    } catch (e) {
      return [{
        email: "No connection to the server",
        name: "Retry again later",
        start: ["From a moment ago"],
        end: ["Until it works again"],
        competences: [],
      }];
    }
  });
  const [users] = useState(userData);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const applications_per_page = 6;
  const [user, setUser] = useState(searchedUsers[0]);
  const [index, setIndex] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(
    searchedUsers.filter((
      element: any,
      i: number,
    ) => (i < (index + applications_per_page) && i >= index)),
  );

  /**
   * Function to update shown users.
   */
  function searchUsers() {
    const text: string =
      (document.getElementById("search_name") as HTMLInputElement).value
        .toLowerCase();
    const competence: number = Number.parseInt(
      (document.getElementById("search_competence") as HTMLSelectElement).value,
    );
    const filterFn =
      ((user) =>
        user.name.toLowerCase().includes(text) &&
        user.competences.some((comp) => comp[0] == competence));
    const pass = users.filter(filterFn);
    setSearchedUsers(pass);
    setIndex(0);
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
  const listUsers = filteredUsers.map((element, i) => (
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
        Available dates:{" "}
        {user.start.map((comp: Date[], i: number) => (
          <li key={"d" + i} className="list_box">{comp} to {user.end[i]}</li>
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
      <div className="search">
        Search for name:
        <label className="txt_field">
          <input type="text" id="search_name" />
        </label>
        Search for competence:
        <label className="txt_field">
          <select id="search_competence">
            <option value="1">Ticket Sales</option>
            <option value="2">Lotteries</option>
            <option value="3">Roller Coaster Operation</option>
          </select>
        </label>
        <input type="button" value="Search" onClick={searchUsers} />
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
