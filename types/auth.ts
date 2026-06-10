export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordFormData {
  emailOrPhone: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface OTPFormData {
  otp: string;
}

export type AuthPage = 'login' | 'register' | 'verify-otp' | 'forgot-password' | 'reset-password' | 'success';

export interface AuthError {
  message: string;
  field?: string;
}
