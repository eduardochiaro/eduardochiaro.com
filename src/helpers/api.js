import axios from 'axios'
import isDev from './devDetect'

const base = isDev() ? 'http://localhost:3030' : 'https://api.eduardochiaro.com'

function logErrors(error, route) {
  console.log(route)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
}

export const token = async () =>
  axios.post(`${base}/access/new`, { username: 'website' }).catch((error) => {
    logErrors(error, 'access')
  });

export const github = async () => 
  axios.get(`${base}/portfolio/github`, { headers: { authorization:  localStorage.getItem('token') }}).catch((error) => {
    logErrors(error, 'github')
  });

export const work = async () =>
  axios.get(`${base}/portfolio/work`, { headers: { authorization:  localStorage.getItem('token') }}).catch((error) => {
    logErrors(error, 'work')
  });

export const apps = async () =>
  axios.get(`${base}/portfolio/apps`, { headers: { authorization:  localStorage.getItem('token') }}).catch((error) => {
    logErrors(error, 'apps')
  });

export const skills = async () =>
  axios.get(`${base}/portfolio/skills`, { headers: { authorization:  localStorage.getItem('token') }}).catch((error) => {
    logErrors(error, 'skills')
  });
  
