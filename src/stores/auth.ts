import { defineStore } from 'pinia';
import axios from '../axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    message: null as string | null,
    user: null as User | null, // Agregar estado para el usuario
  }),
  actions: {
    async login(credentials: { email: string; password: string, device_name: string }): Promise<void> {
      const { data } = await axios.post<LoginResponse>(axios.defaults.baseURL + '/api/login', credentials);
      this.token = data.token;
      this.message = data.message;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },
    async fetchUserProfile(): Promise<void> {
      if (!this.token) return;

      try {
        const { data } = await axios.get<User>(axios.defaults.baseURL + '/api/user');
        this.user = data;
      } catch (error) {
        console.error('Error obteniendo perfil:', error);
      }
    },
    logout(): void {
      this.token = null;
      this.message = null;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  persist: true,
});
