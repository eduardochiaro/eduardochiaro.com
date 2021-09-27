import axios from 'axios'

const base =
  process.env.NODE_ENV !== 'development' ? 'https://api.eduardochiaro.com' : 'http://localhost:3030'
// const base = 'https://api.eduardochiaro.com';

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

export const getToken = async () =>
  axios.post(`${base}/access/new`, { username: 'website' }).catch((error) => {
    logErrors(error, 'access')
  })

export const github = async (token) =>
  axios.get(`${base}/portfolio/github`, { headers: { authorization: token } }).catch((error) => {
    logErrors(error, 'github')
  })

export const work = async (token) =>
  axios.get(`${base}/portfolio/work`, { headers: { authorization: token } }).catch((error) => {
    logErrors(error, 'work')
  })

export const apps = async (token) =>
  axios.get(`${base}/portfolio/apps`, { headers: { authorization: token } }).catch((error) => {
    logErrors(error, 'apps')
  })

export const skills = async (token) =>
  axios.get(`${base}/portfolio/skills`, { headers: { authorization: token } }).catch((error) => {
    logErrors(error, 'skills')
  })
