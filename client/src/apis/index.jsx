import axios from "axios";

// const URL = "http://localhost:5000";
const URL =  process.env.NODE_ENV === "production" ? "https://short-pfy7.onrender.com" : "http://localhost:5000";

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const signup = (authData) => API.post("/user/signup", authData);
export const login = (authData) => API.post("/user/login", authData);

export const createUrl = (urlData) => API.post("/url/create", urlData);
export const getAllUrls = () => API.get("/url/all");
export const deleteUrl = (urlId) => API.delete(`/url/delete/${urlId}`);
