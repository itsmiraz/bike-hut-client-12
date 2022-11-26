import axios from "axios";

 const request = axios.create({
  baseURL: "https://bike-hut-server.vercel.app",
  headers: {
      "content-type": "application/json",
  }
 });

export default request;