import React, { useState, useEffect } from "react";
import DefaultPage from "~/components/defaultpage.tsx";
import { useDeno } from 'aleph/react'

/**
 * The admin page for recruiters to see the applications
 * @returns A page with applications
 */
export default function Application() {
  //TODO: Check if user is logged in and return proper page and if not return log in page
  //TODO: Add Search function to filter users

  /**
   * Retrieves and formats the user data.
   */
   const userData = useDeno(async () => {
    var response_data:any;
    await fetch(`http://localhost:8000/application`)
    .then(res => res.text())
    .then(data => response_data = JSON.parse(data))
    return response_data;
  });
  const [users, setUsers] = useState(userData);
  const applications_per_page = 10;
  const [user, setUser] = useState(users[0]);
  const [index, setIndex] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(
    users.filter((
      element:any,
      i:number,
    ) => (i < (index + applications_per_page) && i >= index)),
  );


  /**
   * Selects the previous page indice for the list.
   * Loops around the list.
   */
  function prevPage() {
    var prev = (index - applications_per_page < 0)
      ? ((users.length % applications_per_page != 0)
        ? (users.length - (users.length % applications_per_page))
        : users.length - applications_per_page)
      : index - applications_per_page;
    setIndex(prev);
    setFilteredUsers(
      users.filter((
        element:any,
        i:number,
      ) => (i < (prev + applications_per_page) && i >= prev)),
    );
  }

  /**
   * Selects the next page indice for the list.
   * Loops around the list.
   */
  function nextPage() {
    var next = (index + applications_per_page < users.length)
      ? index + applications_per_page
      : 0;
    setIndex(next);
    setFilteredUsers(
      users.filter((
        element:JSON,
        i:number,
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
    >
      {element.name}
    </li>
  ));
  
  /**
   * Lists the competence ID to its corresponding competence
   * @param i The Competence ID
   * @returns The competence
   */
  function listCompetence(i:number[]){
    switch(i[0]){
      case( 1 || "A"): {
        return "Ticket Sales " + i[1] + " YoE" 
      }
      case 2 || "B": {
        return "Lotteries " + i[1] + " YoE" 
      }
      case 3 || "C": {
        return "Roller Coaster Operation " + i[1] + " YoE" 
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
        Email: {user.email}
        <br></br>
      </p>
      <p>
        Start date: {user.start.map((comp) => <p>{comp}</p>)}
        <br></br>
      </p>
      <p>
        End date: {user.end.map((comp) => <p>{comp}</p>)}
        <br></br>
      </p>
      <p>
        Name: {user.name}
        <br></br>
      </p>
      <p>Competences: {user.competences.map((comp) => <p>{listCompetence(comp)}</p>)}</p>
    </div>
  );

  return (
    <DefaultPage header="View Applications">
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
