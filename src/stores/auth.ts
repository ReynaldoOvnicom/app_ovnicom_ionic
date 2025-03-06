import { defineStore } from 'pinia';
import axios from '../axios';

// Definir interfaz para el perfil del usuario (opcional)
interface UserProfile {
  id: number
  user_id: number
  account_number: string
  phone_number: string
  date_of_birth: string | null
  address: string | null
  city: string | null
  country: string | null
  verified_account: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// Definir la interfaz para el usuario (perfil puede ser opcional)
interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  two_factor_confirmed_at: string | null
  current_team_id: number | null
  profile_photo_path: string | null
  created_at: string
  updated_at: string
  erp_partner_id: number | null
  profile_photo_url: string
  user_profile?: UserProfile | null
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
    errorMessage: null as string|null, // Nuevo estado para manejar errores
  }),
  actions: {
    async login(credentials: { email: string; password: string, device_name: string }): Promise<void> {
      this.errorMessage = null;
      try {

        const { data } = await axios.post<LoginResponse>(axios.defaults.baseURL + '/api/login', credentials);
        this.token = data.token;
        this.message = data.message;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        localStorage.setItem('token', this.token);

        await this.fetchUserProfile();

      } catch(error: any){
        console.error("Error en login:", error);
        this.errorMessage = error.response?.data?.message || 'Error desconocido';
        throw new Error(this.errorMessage?.toString());
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
      this.errorMessage = null;
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization'];
    },
    async forgotPassword(email: string): Promise<void> {
      try {
        this.message = null
        this.errorMessage = null
    
        const { data } = await axios.post(`${axios.defaults.baseURL}/api/forgot-password`, { email })
        
        this.message = data.message // Guardamos el mensaje de éxito
      } catch (err: any) {
        this.errorMessage = err.response?.data?.message || 'Error al solicitar restablecimiento de contraseña'
      }
    }
  },
  persist: true,
});
