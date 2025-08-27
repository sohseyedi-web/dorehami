import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ApiError, ApiResponse, LoginInput, LoginResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useLogin() {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const { data } = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });
      return data;
    },
  });
}

export function useMe() {
  return useQuery<ApiResponse, AxiosError<ApiError>>({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>('/api/auth/me');
      return data;
    },
    retry: false,
  });
}
