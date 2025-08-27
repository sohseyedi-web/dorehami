import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ApiError, CommentsResponse, StatsResponse, STATUS, UpdateStatusResponse } from '@/types';
import toast from 'react-hot-toast';

export function useGetComments() {
  return useQuery<CommentsResponse, AxiosError<ApiError>>({
    queryKey: ['admin-comments'],
    queryFn: async () => {
      const { data } = await axios.get<CommentsResponse>('/api/admin/comments');
      return data;
    },
  });
}

export function useUpdateCommentStatus() {
  const queryClient = useQueryClient();

  return useMutation<UpdateStatusResponse, AxiosError<ApiError>, { id: string; status: STATUS }>({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.patch<UpdateStatusResponse>(`/api/admin/comments/${id}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('تغییر وضعیت یافت');
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, AxiosError<ApiError>, { id: string }>({
    mutationFn: async ({ id }) => {
      const { data } = await axios.delete<{ message: string }>(`/api/admin/comments/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('حذف شد');
    },
  });
}

export function useCommentStats() {
  return useQuery<StatsResponse, AxiosError<ApiError>>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await axios.get<StatsResponse>('/api/admin/stats');
      return data;
    },
  });
}
