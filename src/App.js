import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
// import { Container } from 'react-bootstrap'
import Header from './components/Header/Header.lazy'
import Jobs from './components/Jobs/Jobs.lazy'
import Share from './components/Share/Share.lazy'
import { token } from './helpers/api'
import Skills from './components/Skills/Skills.lazy'
import Apps from './components/Apps/Apps.lazy'
import GitHub from './components/GitHub/GitHub.lazy'
import Footer from './components/Footer/Footer.lazy'

class App extends Component {

  async componentDidMount() {
    try {
      const response = await token();
      localStorage.setItem('token', response.data);
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <Header />
        <Jobs />
        <Share />
        <Skills />
        <Apps />
        <GitHub />
        <Footer />
      </>
    )
  }
}

export default App
