import Axios from 'axios'

const APIService = (() => {
  const baseURL = '/'
  const httpService = Axios.create({ baseURL }) 
  return httpService
})()

export default APIService