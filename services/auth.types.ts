export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  password: string;
}

export interface SendPasswordResetEmailProps {
  email: string;
}

export type { User } from 'firebase/auth';
