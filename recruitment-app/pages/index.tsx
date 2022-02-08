import React from 'react'
import DefaultPage from '~/components/defaultpage.tsx'

export default function Home() {
  //Check if user is logged in and return proper page and if not return log in page
  return (
      <DefaultPage title='Login to site'>
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
      </DefaultPage>
  )
}
