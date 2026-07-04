import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  AuthTokens,
  CurrentUser,
  LoginDto,
  RegisterDto,
} from "@/types/auth";
import type { ApiResponse } from "@/types/common";

interface AuthTokensResponse {
  access_token: string;
  refresh_token: string;
}

function toAuthTokens(response: AuthTokensResponse): AuthTokens {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  };
}

export const authApi = {
  login: (data: LoginDto): Promise<AuthTokens> =>
    api
      .post<ApiResponse<AuthTokensResponse>>(ENDPOINTS.AUTH.LOGIN, data)
      .then((r) => toAuthTokens(r.data.data)),

  register: (data: RegisterDto): Promise<AuthTokens> =>
    api
      .post<ApiResponse<AuthTokensResponse>>(ENDPOINTS.AUTH.REGISTER, {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        org_name: data.orgName,
      })
      .then((r) => toAuthTokens(r.data.data)),

  refresh: (refreshToken: string): Promise<AuthTokens> =>
    api
      .post<ApiResponse<AuthTokensResponse>>(ENDPOINTS.AUTH.REFRESH, {
        refresh_token: refreshToken,
      })
      .then((r) => toAuthTokens(r.data.data)),

  getCurrentUser: (): Promise<CurrentUser> =>
    api
      .get<ApiResponse<CurrentUser>>(ENDPOINTS.AUTH.ME)
      .then((r) => r.data.data),
};
