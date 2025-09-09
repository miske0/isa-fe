import axios from 'axios';

const API_URL = "http://localhost:8080";

export class AuthService {
    static async login(email: string, password: string) {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const token = response.data.token;

        // sačuvaj token u localStorage
        localStorage.setItem("token", token);

        return token;
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static logout() {
        localStorage.removeItem("token");
    }
}
