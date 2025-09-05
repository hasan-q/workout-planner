import axios from "axios";
import { getAccessToken } from "./tokenService";

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(config => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;