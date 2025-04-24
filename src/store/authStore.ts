import { create } from 'zustand';
import { AuthState } from '../types';

const ADMIN_USERNAME = import.meta.env.VITE_AUTH_CLIENT_ID;;
const ADMIN_PASSWORD = import.meta.env.VITE_AUTH_SECRET;

export const useAuthStore = create<AuthState>((set) => {
  // Check if there's a stored auth state in localStorage
  const storedAuth = localStorage.getItem('auth');
  const initialState = storedAuth ? JSON.parse(storedAuth) : {
    user: null,
    isAuthenticated: false,
  };

  return {
    ...initialState,
    login: (username: string, password: string) => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const authState = {
          user: { username, isAuthenticated: true },
          isAuthenticated: true,
        };
        
        // Store auth state in localStorage
        localStorage.setItem('auth', JSON.stringify(authState));
        
        set(authState);
        return true;
      }
      return false;
    },
    logout: () => {
      localStorage.removeItem('auth');
      set({ user: null, isAuthenticated: false });
    }
  };
});