import axios from "axios";

const API = axios.create({
  baseURL: "https://ethara-task-manager-14sh.onrender.com/api"
  //  "http://localhost:5000/api"
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default API;