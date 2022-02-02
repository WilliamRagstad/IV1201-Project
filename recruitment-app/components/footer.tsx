import { useDeno } from 'aleph/react'
import React from 'react'

export default function Footer() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="header">
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="links">
        <a href="https://alephjs.org" target="_blank">Created at KTH</a>
        <span></span>
        <a href="https://alephjs.org/docs/get-started" target="_blank">Contact us</a>
        <span></span>
        <a href="https://alephjs.org/docs" target="_blank">Lorem Ipsum</a>
        <span></span>
        <a href="https://github.com/WilliamRagstad/IV1201-Project" target="_blank">Github</a>
      </p>
     
    </div>
  )
}
