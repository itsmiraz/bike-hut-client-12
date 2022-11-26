import axios from "axios";

 const request = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
      "Content-type": "application/json",
      authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
  }
 });

export default request;