import { useDeno } from 'aleph/react'
import React from 'react'
import Logo from '~/components/logo.tsx'

export default function Header() {
  //If logged in, dont show sign up
  return (
    <div className="header">
      <head>
        <link rel="stylesheet" href="../style/index.css" />
        <head>
        <title>Amusement Park Recruiting</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      </head>
      <p className="logo"><Logo /></p>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        <a href="/job">Apply for Job</a>
        <span></span>
        <a href="/signup">Sign Up</a>
      </p>
    </div>
  )
}
