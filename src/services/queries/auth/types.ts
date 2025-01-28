export interface RegisterRequest {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  firstName: null;
  lastName: null;
  onboarded: boolean;
}

export interface LoginResponse {
  statusCode: number;
  description: string;
  data: {
    accessToken: string;
    profile: User;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  // callbackUrl?: string;
}
export interface VerifyAccount {
  confirmToken: string;
  action?: string;
}
export interface IResetPassword {
  password: string;
  otp: string;
}
