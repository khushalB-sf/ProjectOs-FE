export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  role: string;
  orgName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Current authenticated user (`GET /auth/me`, snake_case per API contract). */
export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
  org_id?: string;
  skills?: string[];
  experience_years?: number;
}
