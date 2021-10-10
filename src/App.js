import React, { useState, useEffect, StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
// import { Container } from 'react-bootstrap'
import Header from './components/Header/Header.lazy'
import Bio from './components/Bio/Bio.lazy'
import Jobs from './components/Jobs/Jobs.lazy'
import Share from './components/Share/Share.lazy'
import { getToken } from './helpers/api'
import Skills from './components/Skills/Skills.lazy'
import Apps from './components/Apps/Apps.lazy'
import GitHub from './components/GitHub/GitHub.lazy'
import Footer from './components/Footer/Footer.lazy'

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    try {
      if (!token) {
        getToken().then((response) => {
          if (response && response.data) {
            setToken(response.data)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <StrictMode>
      <Header />
      <Bio />
      <Jobs token={token} />
      <Share />
      <Skills token={token} />
      <Apps token={token} />
      <GitHub token={token} />
      <Footer />
    </StrictMode>
  )
}

export default App
