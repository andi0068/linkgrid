export type User = {
  uid: string;
  email: string;
  image?: string;
  username?: string;
  profile_title?: string;
  bio?: string;
};

export interface CreateProps {
  uid: string;
  email: string;
}

export type GetByUsernameReturn = Exclude<GetByUsernameOneReturn, null>[];

export type GetByUsernameOneReturn = (Omit<User, 'username'> & { username: string }) | null;

export interface UpdateProps {
  uid: string;
  image?: File | null;
  username?: string;
  profile_title?: string;
  bio?: string;
}
