import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  AuthTokens,
  CurrentUser,
  LoginDto,
  RegisterDto,
} from "@/types/auth";

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
      .post<AuthTokensResponse>(ENDPOINTS.AUTH.LOGIN, data)
      .then((r) => toAuthTokens(r.data)),

  register: (data: RegisterDto): Promise<AuthTokens> =>
    api
      .post<AuthTokensResponse>(ENDPOINTS.AUTH.REGISTER, {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        org_name: data.orgName,
      })
      .then((r) => toAuthTokens(r.data)),

  refresh: (refreshToken: string): Promise<AuthTokens> =>
    api
      .post<AuthTokensResponse>(ENDPOINTS.AUTH.REFRESH, {
        refresh_token: refreshToken,
      })
      .then((r) => toAuthTokens(r.data)),

  getCurrentUser: (): Promise<CurrentUser> =>
    api.get<CurrentUser>(ENDPOINTS.AUTH.ME).then((r) => r.data),
};
