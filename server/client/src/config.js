import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://blejn-blogchat.herokuapp.com/api/",
});
