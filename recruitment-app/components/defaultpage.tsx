import React from 'react'
import Header from '~/components/header.tsx'
import Footer from '~/components/footer.tsx'
import '../style/index.css'


export default function DefaultPage({ title, children}: { title: string, children: React.ReactNode}) {
    return (
      <div className="page">
        <Header></Header>
        <head>
            <title>Amusement Park Recruiting</title>
        </head>
        <h1>Welcome to <strong>Amusement Park Recruiting</strong>!</h1>
        <h2>{title}</h2>
        {children}
        <Footer></Footer>
      </div>
    )
  }