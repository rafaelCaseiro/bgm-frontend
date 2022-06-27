import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL:
    window.location.href.indexOf("localhost") < 0
      ? "https://api.bgm.zenbytes.com.br"
      : "http://localhost:8080",
});

let autocompleterequests = 0;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.url === "filter/autocomplete") {
    while (autocompleterequests) {
      await timeout(100);
    }
    autocompleterequests++;
  }
  return config;
});

api.interceptors.response.use(async (response) => {
  if (response.config.url === "filter/autocomplete") {
    autocompleterequests--;
  }
  return response;
});

export { api };
