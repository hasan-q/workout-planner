import api from "./api";
import { saveTokens, getRefreshToken } from "./tokenService";

export async function login({ email, password }) {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.accessToken && response.data.refreshToken) {
        saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data;
}

export async function register({ username, email, password }) {
    const response = await api.post("/auth/register", { username, email, password });

    if (response.data.accessToken && response.data.refreshToken) {
        saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data;
}

export async function refreshToken() {
    const refresh = getRefreshToken();

    if (!refresh) throw new Error("No refresh token in local storage");

    const response = await api.post("/auth/refresh-token", { refreshToken: refresh }, {
        headers: { skipAuth: true }
    });

    if (response.data.accessToken) {
        saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data;
}
