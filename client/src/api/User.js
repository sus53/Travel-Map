import axios from "axios"
const URL = "https://travel-map-pink.vercel.app/User"

export const LoginUser = (user) => axios.post(`${URL}/login`, user);
export const RegisterUser = (user) => axios.post(`${URL}/register`, user);