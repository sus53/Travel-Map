import axios from "axios"
const URL = "http://localhost:4000/pin"

export const GetPin = () => axios.get(URL);
export const CreatePin = (pin) => axios.post(URL, pin);