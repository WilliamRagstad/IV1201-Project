import { useDeno } from 'aleph/react'
import React from 'react'

export default function Header() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="header">
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="nav">
        <a href="/">Home</a>
        <span></span>
        <a href="/job">Apply for Job</a>
        <span></span>
        <a href="/login">Login</a>
      </p>
    </div>
  )
}
