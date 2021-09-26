import process from 'process'

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const isDev = () => development
export default isDev
