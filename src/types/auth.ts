import { User } from 'firebase/auth';

export interface PhoneAuthProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  name?: string;
}

export interface PhoneAuthError {
  message: string;
  code?: string;
} 