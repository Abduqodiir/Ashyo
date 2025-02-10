export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  user: {
      id: number;
      email: string;
      fullname: string;
      role: string;
      is_verified: boolean;
  };
}