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
}
