import React from 'react'
import DefaultPage from '../components/defaultpage.tsx'

export default function Signup() {
  return (
    <DefaultPage title='Sign up'>
      <form action="http://localhost:8000/user" method="post" className="signup_form">
        <div className="personal_information">
            First Name:
          <label className="txt_field">
            <input type="text" name="firstname"/> 
          </label>
            Last Name:
          <label className="txt_field">
            <input type="text" name="lastname"/> 
          </label>
          Person Number: 
          <label className="txt_field">
            <input type="number" name="personnumber"/> 
          </label>
          Country: 
          <label className="txt_field">
            <input type="text" name="country"/> 
          </label>
          City: 
          <label className="txt_field">
            <input type="text" name="city"/> 
          </label>
          Phone: 
          <label className="txt_field">
            <input type="number" name="phone"/> 
          </label>
          Email:
          <label className="txt_field">
            <input type="email" name="email"/> 
          </label>
          Password:
          <label className="txt_field">
            <input type="password" name="password"/> 
          </label>
        </div>
        
        <input type="submit" value="Sign Up" className="button"/>
      </form>
    </DefaultPage>
  )
}
