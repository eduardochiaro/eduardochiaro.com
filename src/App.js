import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Container } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import Navigation from './components/Navigation/Navigation.lazy'
import Header from './components/Header/Header.lazy'
import Jobs from './components/Jobs/Jobs.lazy'
import Bio from './components/Bio/Bio.lazy'
import Share from './components/Share/Share.lazy'
import Apps from './components/Apps/Apps.lazy'
import GitHub from './components/GitHub/GitHub.lazy'
import Footer from './components/Footer/Footer.lazy'

function App() {
  const { ref, inView } = useInView({
    threshold: 0,
  })
  return (
    <Container fluid style={{ margin: 0, padding: 0 }}>
      <Navigation inView={inView} />
      <div ref={ref}>
        <Header />
      </div>
      <Bio />
      <Share />
      <Jobs />
      <Apps />
      <GitHub />
      <Footer />
    </Container>
  )
}

export default App
