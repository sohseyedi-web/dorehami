export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

export interface IUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export type ApiResponse = {
  user: IUser;
};
