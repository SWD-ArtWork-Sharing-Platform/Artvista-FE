import { API_AUTH_URL } from '@/config/apiConfig';
import { LoginRequestDTO } from '@/models/LoginRequestDTO';
import { ResponseDTO } from '@/models/ResponseDTO';
import axios, { AxiosResponse } from 'axios';

export class AuthService {
    static getToken(): string | null {
        return localStorage.getItem('token');
    }

    static setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    static removeToken(): void {
        localStorage.removeItem('token');
    }

    static async login(loginRequest: LoginRequestDTO): Promise<ResponseDTO<any>> {
        try {
            const response: AxiosResponse<ResponseDTO<any>> = await axios.post(API_AUTH_URL + '/api/auth/login', loginRequest);
            return response.data;
        } catch (error: any) {
            console.error('Login failed:', error.response.data);
            throw error.response.data;
        }
    }
}
