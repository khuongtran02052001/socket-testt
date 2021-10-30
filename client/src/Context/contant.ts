// sua lai apiUrl se het loi
export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000/api'
    : 'https://create-minifb.herokuapp.com/api';

export const LOCAL_STORAGE = 'store';
