import axios from "axios"
const URL = "http://localhost:4000/User"

export const LoginUser = (user) => axios.post(`${URL}/login`, user);
export const RegisterUser = (user) => axios.post(`${URL}/register`, user);