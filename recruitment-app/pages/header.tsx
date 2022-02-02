import { useDeno } from 'aleph/react'
import React from 'react'

export default function Header() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="header">
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="links">
        <a href="https://alephjs.org" target="_blank">Website</a>
        <span></span>
        <a href="https://alephjs.org/docs/get-started" target="_blank">Get Started</a>
        <span></span>
        <a href="https://alephjs.org/docs" target="_blank">Docs</a>
        <span></span>
        <a href="https://github.com/alephjs/aleph.js" target="_blank">Github</a>
      </p>
     
    </div>
  )
}
