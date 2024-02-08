import axios from "axios"
const URL = "https://travel-map-pink.vercel.app/pin"

export const GetPin = () => axios.get(URL);
export const CreatePin = (pin) => axios.post(URL, pin);