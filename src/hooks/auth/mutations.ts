import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/services/auth/authApi";

import type { AuthTokens, LoginDto, RegisterDto } from "@/types/auth";

export function useLogin() {
  return useMutation<AuthTokens, Error, LoginDto>({
    mutationFn: authApi.login,
  });
}

export function useRegister() {
  return useMutation<AuthTokens, Error, RegisterDto>({
    mutationFn: authApi.register,
  });
}
