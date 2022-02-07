import { useDeno } from 'aleph/react'
import React from 'react'
import Header from '~/components/header.tsx'
import Footer from '~/components/footer.tsx'

export default function Job() {
  return (
    <div className="page">
      <Header></Header>      
      <h1>Welcome to use <strong>Amusement Park Recruiting</strong>!</h1>
      <h2>Apply for work here</h2>
      <form action="/" method="post" className="signup_form">
        <div className="expertise">
          <label className="check_box">
            <input type="checkbox" name="expertise1"/> 
            Customer Support
          </label> 
          <label className="check_box">
            <input type="checkbox" name="expertise2"/> 
            IT
          </label>
          <label className="check_box">
            <input type="checkbox" name="expertise3"/> 
            Food and Restaurant
          </label>
          <label className="check_box">
            <input type="checkbox" name="expertise4"/> 
            Administration
          </label>   
        </div>
        <div className="availability_dates">
          <label>
            Dates for work:  
            <input type="date" name="startdate"/> 
            <input type="date" name="enddate"/> 
          </label>  
        </div>    
        <input type="submit" value="Apply" className="button"/>
      </form>
      <Footer></Footer>
    </div>
  )
}
