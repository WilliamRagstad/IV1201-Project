import { useDeno } from 'aleph/react'
import React from 'react'

export default function Footer() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="footer">
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="links">
        <a href="https://www.kth.se/" target="_blank">Created at KTH</a>
        <span></span>
        <a href="/about">About Us</a>
        <span></span>
        <a href="https://alephjs.org/" target="_blank">Aleph.js</a>
        <span></span>
        <a href="https://github.com/WilliamRagstad/IV1201-Project" target="_blank">Github</a>
      </p>
     
    </div>
  )
}
