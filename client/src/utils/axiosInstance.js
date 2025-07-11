import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true, // if you're using cookies
});

export default instance;
