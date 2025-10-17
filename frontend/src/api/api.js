import axios from "axios";
import { getAccessToken, saveTokens } from "./tokenService";
import { refreshToken } from "./authService";

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
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const data = await refreshToken();
                if (data.accessToken) {
                    saveTokens(data.accessToken, data.refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh failed:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;