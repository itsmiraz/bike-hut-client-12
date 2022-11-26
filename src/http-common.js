import axios from "axios";

 const request = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
      authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`,
      "content-type": "application/json",
  }
 });

export default request;