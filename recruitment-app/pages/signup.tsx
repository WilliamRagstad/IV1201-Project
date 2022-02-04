import { useDeno } from 'aleph/react'
import React from 'react'
import Header from '~/components/header.tsx'
import Footer from '~/components/footer.tsx'

export default function Signup() {
  return (
    <div className="page">
      <Header></Header>
      <h1>Welcome to use <strong>Amusement Park Recruiting</strong>!</h1>
      <h2>Signup here</h2>
      <form action="/signedup" method="post" className="signup_form">
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
        
        <input type="submit" value="Sign Up" class="button"/>
      </form>
      <Footer></Footer>
    </div>
  )
}
