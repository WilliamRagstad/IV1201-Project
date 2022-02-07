import { useDeno } from 'aleph/react'
import React from 'react'
import Header from '~/components/header.tsx'
import Footer from '~/components/footer.tsx'
import * as css from '../styles/index.css'

export default function Home() {
  //Check if user is logged in and return proper page and if not return log in page
  return (
    <div className="page">
      <Header></Header>
     
      <h1>Welcome to use <strong>Amusement Park Recruiting</strong>!</h1>
      <h2>Apply for work here</h2>
      <form action="/" method="post" className="signup_form">
          Email:
          <label className="txt_field">
            <input type="email" name="email"/> 
          </label>
          Password:
          <label className="txt_field">
            <input type="password" name="password"/> 
          </label>
        <input type="submit" value="Login" className="button"/>
      </form>
      <Footer></Footer>
    </div>
  )
}
