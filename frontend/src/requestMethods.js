import axios from "axios";

const BASE_URL = "https://mernelectronics.herokuapp.com/api";

// const Token = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo")).token
//   : null;

export const axiosRequest = axios.create({
  baseURL: BASE_URL,
});
