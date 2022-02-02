import { useDeno } from 'aleph/react'
import React from 'react'
import useCounter from '~/lib/useCounter.ts'
import Header from '~/components/header.tsx'
import Footer from '~/components/footer.tsx'

export default function Home() {
  const [count, isSyncing, increase, decrease] = useCounter()
  const version = useDeno(() => Deno.version.deno)

  return (
    
    <div className="page">
      <Header></Header>
      <head>
        <title>Amusement Park Recruiting</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      
      <h1>Welcome to use <strong>Amusement Park Recruiting</strong>!</h1>
      <h2>Apply for work here</h2>
      <form action="/" method="post" className="signup_form">
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
          Email:
          <label className="txt_field">
            
            <input type="email" name="email"/> 
          </label>
        </div>
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
        <input type="submit" value="Apply" class="button"/>
      </form>
      <Footer></Footer>
    </div>
  )
}
