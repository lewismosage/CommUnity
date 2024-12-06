import api from './api';

interface RegisterData {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    user?: any;
    access_token?: string;
    refresh_token?: string;
    message?: string;
    redirectTo?: string;
}

const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await api.post('/api/register', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            console.error('Registration error:', error.response?.data);
            throw error;
        }
    },

    async login(data: LoginData): Promise<AuthResponse> {
        try {
            const response = await api.post('/api/login', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error.response?.data);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    async getCurrentUser(): Promise<any> {
        try {
            const response = await api.get('/api/auth/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getStoredToken(): string | null {
        return localStorage.getItem('token');
    }
};

export default authService; 