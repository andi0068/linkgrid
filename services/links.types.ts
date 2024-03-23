export type Link = {
  id: string;
  user_uid: string;
  url: string;
  title?: string;
};

export interface CreateProps {
  user_uid: string;
  url: string;
}

export interface UpdateProps {
  id: string;
  title?: string;
  url?: string;
}

export interface RemoveProps {
  id: string;
}
