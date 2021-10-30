/* eslint-disable consistent-return */
import axios from 'axios';

import { apiUrl } from '../Context/contant';

export const getPosts = async (limit = 5, page: number) => {
  try {
    const res = await axios.get(
      `${apiUrl}/posts?_limit=${limit}&_page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getId = async (id: number) => {
//   const paths = await getPosts(id);
//   return paths.map((item: any) => ({
//     params: {
//       id: `${item._id}`,
//     },
//   }));
// };

export const getPostId = async (id: any) => {
  const res = await axios.get(`${apiUrl}/posts/${id}`);
  return res.data;
};

export const getUserId = async (limit?: number) => {
  const res = await axios.get(`${apiUrl}/auth/getuser`, { params: { limit } });
  return res.data;
};

export const getDataUser = async (id: any) => {
  const res = await axios.get(`${apiUrl}/posts/post/user/${id}`);
  return res.data;
};

export const getNotifications = async (limit = 2, page: number) => {
  const res = await axios.get(
    `${apiUrl}/posts/notification?_limit=${limit}&_page=${page}`
  );
  return res.data;
};
