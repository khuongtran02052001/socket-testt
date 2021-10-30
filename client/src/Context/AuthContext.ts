import React from 'react';

export interface User {
  username: string;
  avatar: string;
  _id: string;
  fullname: string;
}
const defaultUser = { username: '', avatar: '', _id: '', fullname: '' };

export interface NotificationProps {
  receiver: string;
  message: string;
  postId: string;
}

const defautlNoti = { receiver: '', message: '', postId: '' };

export interface LikeProps {
  _id: string;
  authorId: any;
  postId: any;
}

const defaultLike = { _id: '', postId: '', authorId: '' };

export interface CmtProps {
  cmtAuthor: [];
}

const defaultCmt = { cmtAuthor: [] };

export const UserContext = React.createContext({
  user: defaultUser,
  setUser: (_user: User) => {},
  notification: defautlNoti,
  setNotification: (_notification: NotificationProps) => {},
  likeContext: defaultLike,
  setLikeContext: (_like: LikeProps) => {},
  cmtContext: defaultCmt,
  setCmtContext: (_cmt: CmtProps) => {},
});
