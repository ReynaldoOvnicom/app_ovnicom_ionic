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
    token: localStorage.getItem('token') || '',
    message: null as string | null,
    user: null as User | null, // Agregar estado para el usuario
  }),
  actions: {
    async login(credentials: { email: string; password: string, device_name: string }): Promise<void> {
      try {

        const { data } = await axios.post<LoginResponse>(axios.defaults.baseURL + '/api/login', credentials);
        this.token = data.token;
        this.message = data.message;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        localStorage.setItem('token', this.token);

        await this.fetchUserProfile();

      } catch(error){
        console.error("Error en login:", error);
      }
    },
    async fetchUserProfile(): Promise<void> {
      if (!this.token) return;

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const { data } = await axios.get<User>(axios.defaults.baseURL + '/api/profile');
        this.user = data;
        console.log("Usuario cargado:", this.user);
      } catch (error) {
        console.error('Error obteniendo perfil:', error);
        this.logout();
      }
    },
    logout(): void {
      this.token = '';
      this.message = null;
      this.user = null;
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  persist: true,
});
