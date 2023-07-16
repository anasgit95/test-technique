import axios from 'axios';


export const baseURL = `http://localhost:3005/`
export const api = axios.create({
  baseURL
});