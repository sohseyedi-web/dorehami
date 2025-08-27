export type STATUS = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface IComment {
  id: string;
  content: string;
  status: STATUS;
  fileName: string | null;
  fileUrl: string | null;
  createdAt: string;
  user: {
    email: string;
  };
}

export type CommentsResponse = { comments: IComment[] };

export type CommentInput = {
  comment: string;
  file?: File | null;
};

export interface ICommentResponse {
  message: string;
  comment: {
    id: string;
    content: string;
    fileUrl: string | null;
    fileName: string | null;
    status: string;
    user: {
      email: string;
    };
  };
}

export type ApiError = {
  error: string;
};
