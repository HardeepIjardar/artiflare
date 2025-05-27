import { User } from 'firebase/auth';

export type UserType = 'buyer' | 'artisan';
export type UserRole = 'customer' | 'artisan' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  companyName?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string, displayName?: string) => Promise<{ user: User | null; error: string | null }>;
  login: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  googleLogin: () => Promise<{ user: User | null; error: string | null }>;
  facebookLogin: () => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<{ success: boolean; error: string | null }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error: string | null }>;
}

export interface FormErrors {
  [key: string]: string;
}

export interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  phoneNumber?: string;
} 