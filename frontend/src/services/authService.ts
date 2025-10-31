import api from './api';
import { AuthResponse, User } from '@models/index';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  role?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  }

  async register(data: RegisterData): Promise<void> {
    await api.post('/auth/register', data);
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ status: string; data: { user: User } }>('/auth/me');
    return response.data.user;
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();