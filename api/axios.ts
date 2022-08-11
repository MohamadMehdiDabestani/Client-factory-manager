import axios from 'axios';


export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API
});

export const axiosPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
    headers: { Accept: "application/json",
    "Content-Type": "application/json", },
});