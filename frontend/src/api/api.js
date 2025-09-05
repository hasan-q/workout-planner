import axios from "axios";
import { getAccessToken } from "./tokenService";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000
});

api.interceptors.request.use(config => {
    if (!config.headers.skipAuth) {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized Request");
        }
        return Promise.reject(error);
    }
);

export default api;