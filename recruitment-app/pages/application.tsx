import React, { useState } from 'react'
import DefaultPage from '~/components/defaultpage.tsx'

/**
 * The admin page for recruiters to see the applications
 * @returns A page with applications
 */
export default function Application() {
  //TODO: Check if user is logged in and return proper page and if not return log in page
  //TODO: Add Search function to filter users
  //TODO: Retrieve users from backend
  //Temp Test Data until connected
  const users = [
    {email: "waxbrink@kth.se1", name: "Kalle Karlsson 1", competences: ["Customer Service", "B", "C"], start: "2020-05-30", end: "2021-01-30"},
    {email: "waxbrink@kth.se2", name: "Pelle Andersson 2", competences: ["A", "B", "C"], start: "2020-06-31", end: "2021-02-25"},
    {email: "waxbrink@kth.se3", name: "Per Persson 3", competences: ["A", "B", "C"], start: "2020-07-20", end: "2021-03-26"},
    {email: "waxbrink@kth.se4", name: "Stig Nilsson 4", competences: ["A", "B", "C"], start: "2020-08-05", end: "2021-04-12"},
    {email: "waxbrink@kth.se5", name: "Sven Svensson 5", competences: ["A", "B", "C"], start: "2020-09-22", end: "2021-05-13"},
    {email: "waxbrink@kth.se6", name: "Knut Dagsson 6", competences: ["A", "B", "C"], start: "2020-10-12", end: "2021-06-15"},
    {email: "waxbrink@kth.se7", name: "Patrik Hammar 7", competences: ["A", "B", "C"], start: "2020-12-27", end: "2021-07-20"},
    {email: "waxbrink@kth.se1", name: "Kalle Karlsson 8", competences: ["Customer Service", "B", "C"], start: "2020-05-30", end: "2021-01-30"},
    {email: "waxbrink@kth.se2", name: "Pelle Andersson 9", competences: ["A", "B", "C"], start: "2020-06-31", end: "2021-02-25"},
    {email: "waxbrink@kth.se3", name: "Per Persson 10", competences: ["A", "B", "C"], start: "2020-07-20", end: "2021-03-26"},
    {email: "waxbrink@kth.se4", name: "Stig Nilsson 11", competences: ["A", "B", "C"], start: "2020-08-05", end: "2021-04-12"},
    {email: "waxbrink@kth.se5", name: "Sven Svensson 12", competences: ["A", "B", "C"], start: "2020-09-22", end: "2021-05-13"},
    {email: "waxbrink@kth.se6", name: "Knut Dagsson 13", competences: ["A", "B", "C"], start: "2020-10-12", end: "2021-06-15"},
  ]
  const applications_per_page = 10;
  const [user, setUser] = useState(users[0]);
  const [index, setIndex] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(users.filter((element, i) => (i<(index+applications_per_page) && i >= index)));

  /**
   * Selects the previous page indice for the list. 
   * Loops around the list, always trying to fill up the page. 
   */
  function prevPage(){
    var prev = (index-applications_per_page>-applications_per_page) ? ((index-applications_per_page<0) ? 0 : index-applications_per_page)  : users.length-applications_per_page;
    setIndex(prev);
    setFilteredUsers(users.filter((element, i) => (i<(prev+applications_per_page) && i >= prev)));
  }
  
  /**
   * Selects the next page indice for the list. 
   * Loops around the list, always trying to fill up the page. 
   */  
  function nextPage(){
    var next = (index+applications_per_page<users.length) ? index+applications_per_page : 0;
    setIndex(next);
    setFilteredUsers(users.filter((element, i) => (i<(next+applications_per_page) && i >= next)));
  }

  /**
   * Lists the selected users. 
   */
  const listUsers = filteredUsers.map((element, i) => 
      <li className="user_box" onClick={()=>setUser(element)}>
        {element.name}
      </li>
  )

  /**
   * Shows full information about the selected user. 
   */
  const currentApplication = (
    <div>
      <p>Email: {user.email}<br></br></p>
      <p>Start date: {user.start}<br></br></p>
      <p>End date: {user.end}<br></br></p>
      <p>Name: {user.name}<br></br></p>
      <p>Competences: {user.competences.map((comp) => <p>{comp}</p>)}</p>
    </div>
  
  );
    
  
  return (
      <DefaultPage title='View Applications'>
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
  )
}
