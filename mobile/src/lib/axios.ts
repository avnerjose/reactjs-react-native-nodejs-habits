import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.120.1.9:3333",
});
