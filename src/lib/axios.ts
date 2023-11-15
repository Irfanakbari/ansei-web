import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const BASE_URL_AUTH = "http://localhost:3000/v1/ansei";
const BASE_URL = "http://localhost:3000/v1/ansei";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosInst = axios.create({
  baseURL: BASE_URL_AUTH,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = setupCache(axiosInst)
