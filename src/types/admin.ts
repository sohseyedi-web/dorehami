export type UpdateStatusResponse = {
  message: string;
  comment: {
    id: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    user: { email: string };
  };
};

export type StatsResponse = {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
};
