import axios from 'axios'

//Chamada da porta do backend
export const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
})