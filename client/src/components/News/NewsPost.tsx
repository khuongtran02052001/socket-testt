/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LikeProps, User, UserContext } from '../../Context/AuthContext';
import { apiUrl } from '../../Context/contant';
import { toast } from 'react-toastify';
import Loading from 'src/loading/Loading';
import io from 'socket.io-client'

export interface Post {
  comments: any[];
  title: string;
  url: string[];
  user: User;
  _id: any;
  likes: LikeProps[];
  createdAt: string;
  totalRows: number;
  refetch?: () => void;
}
const socket = (io as any).connect('http://localhost:4000')

// getlike
export function NewsPost(props: Post) {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = React.useContext(UserContext);
  const { refetch } = props;

  const router = useRouter();

  const liked = props.likes
    ?.map((l) => l?.authorId)
    .includes((user as any)._id);



  const handleLike = async () => {
    setLoading(true)
    socket.emit('like',{
      message: 'Just liked your post',
          receiverId: props.user._id,
          sender: user._id,
          postId: props._id,
    })
    try {
      await axios.post(`${apiUrl}/posts/like/${props._id}`, {});
      if (user._id === props.user._id) return setLoading(false)
      if (!liked) {
        await axios.post(`${apiUrl}/posts/notification`, {
          message: 'Just liked your post',
          receiverId: props.user._id,
          sender: user._id,
          postId: props._id,
        });
      }
      refetch?.();
      setLoading(false)
    } catch (error) {
      toast.error(`Error `);
    }
  
  };
  // redirect
  const handleClick = () => {
    router.push(`/post/${props._id}`);
  };
  return (
    <div className="relative dark:text-black">
      <div
        onClick={handleClick}
        className="block m-auto bg-purple-100 rounded-md shadow-xl cursor-pointer my-7 hover:bg-purple-400 smd:w-6/12 p-14 shadow-custom-light"
      >
        <img
          className="absolute w-12 h-12 mx-4 rounded-full top-2 left-2"
          src={`${props.user?.avatar}`}
        />
        <p className="absolute truncate font-bold hover:italic hover:text-blue-500 top-2 right-40 sm:top-2 sm:left-20 2xl:right-52">
          {props.user?.fullname}
        </p>
        <p className="absolute truncate  sm:top-8 sm:left-20 top-7 right-32 md:right-36 lg:right-36 2xl:right-36">
          {moment(props?.createdAt).fromNow()}
        </p>
        <div className="flex flex-wrap justify-around">
          {props.url.length > 0 &&
            props.url.map((url, i) => (
              <img
                key={i}
                className="flex my-4 shadow-2xl"
                src={`${url}`}
              />
            ))}
        </div>
        <p className="p-2 my-8 text-center">{props.title}</p>
      </div>
      <div
        onClick={handleLike}
        className="absolute flex cursor-pointer bottom-3 left-5"
      >
        <div className="flex">
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
          <p className="cursor-pointer">{props.likes.length}</p>
        </div>
        <Link href={`/post/${props._id}`}>
          <div className="flex mx-5 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <p>{props.comments?.length}</p>
          </div>
        </Link>
      </div>
      {loading && <Loading />}
    </div>
  );
}
