import api from "./api";
import { saveTokens } from "./tokenService";

export async function login({ email, password }) {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.accessToken && response.data.refreshToken) {
        saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data;
}

