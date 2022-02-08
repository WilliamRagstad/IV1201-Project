import React from 'react'
import DefaultPage from '~/components/defaultpage.tsx'

export default function Job() {
  return (
    <DefaultPage title='Apply for work here'>
      <form action="/" method="post" className="signup_form">
        <div className="expertise">
          <h2>Choose your expertise</h2>
          <div className="flex-parent">
            <div className="flex-child">
              <input className="check_box" type="checkbox" name="expertise1" id="expertise1"/>
              <label htmlFor="expertise1"> Ticket sales</label> 
            </div>
            <div className="flex-child">
              <input className="check_box" type="checkbox" name="expertise2" id="expertise2"/>
              <label htmlFor="expertise2"> Lotteries</label>
            </div>
            <div className="flex-child">
              <input className="check_box" type="checkbox" name="expertise3" id="expertise3"/>
              <label htmlFor="expertise3"> Roller coaster operation</label>
            </div>
          </div>
        </div>
        <div className="availability_dates">
          <h2>Dates for work: </h2>
          <div className="flex-parent">
            <div>
              <label htmlFor="startdate">From: </label>
              <input type="date" name="startdate" id="startdate"/>
            </div>
            <div>
              <label htmlFor="enddate">To: </label>
              <input type="date" name="enddate" id="enddate"/>
            </div>
          </div>
        </div>    
        <input type="submit" value="Apply" className="button"/>
      </form>
    </DefaultPage>
  )
}
