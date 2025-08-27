import { ApiError, CommentInput, ICommentResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export function useSendComment() {
  return useMutation<ICommentResponse, AxiosError<ApiError>, CommentInput>({
    mutationFn: async ({ comment, file }) => {
      const formData = new FormData();
      formData.append('comment', comment);
      if (file) {
        formData.append('file', file);
      }

      const { data } = await axios.post<ICommentResponse>('/api/comment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
  });
}
