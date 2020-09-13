import Axios from 'axios'

const APIService = (() => {
  const baseURL = process.env.REACT_APP_REMOTE_URL_ || 'http://localhost:4000'
  const httpService = Axios.create({ baseURL }) 
  return httpService
})()

export default APIService