/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';

import { UserContext } from 'src/Context/AuthContext';
import { LOCAL_STORAGE } from 'src/Context/contant';
import { getDataUser, getUserId } from 'src/service/getPost';

import { Post } from '@/components/News/NewsPost';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion'
import { routeAnimation } from 'src/motion';

interface IndexProps {
  title: string;
  posts: Post[];
  username: string;
  url: string[];
  userId: any;
  _id: number;
  likes: string[];
  comments: [];
  createdAt: string;
}
const Personal: React.FC<IndexProps> = (props) => {
  const { user } = React.useContext(UserContext);

  const [post] = React.useState<IndexProps[]>(props.userId.posts);

  const router = useRouter();

  React.useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE)) {
      toast.error(`Please login , otherwise you are only in view`);
      router.push(`/404`);
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading....</div>;
  }


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user.username}</title>
      </Helmet>
      <main>
        <div className="text-white relative py-6 mx-auto mt-16 max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center h-full mt-6 border-4 border-gray-200 border-dashed rounded-lg shadow-lg ">
              <div className="block text-center">
                {user && (
                  <div className="absolute top-0 -translate-x-1/2 left-1/2">
                    <img
                      className="rounded-full w-36 h-36"
                      src={`${user.avatar}`}
                    />
                    <span className="font-rampartone text-3xl font-bold truncate w-6/12">
                      {user.fullname}
                    </span>
                    <div className="block text-center">
                      total posts : {post.length}
                    </div>
                  </div>
                )}
              </div>
              <div className="holder sm:flex md:flex md:mt-52 sm:mt-52 mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {post && post?.length < 1 ? (
                  <p>cho nay dang suy nghi </p>
                ) :
                  (
                    post.map((item: IndexProps) => {
                      return (
                        <motion.div
                          variants={routeAnimation}
                          initial='initial'
                          animate='animate'
                          exit='exit'
                          className='each mt-28  mb-10 m-2 shadow-custom-light border-gray-800 bg-gray-100 relative'
                        >
                          <Link href={`/post/${item._id}`} key={item._id}>
                            <div className="my-auto">

                              <div >
                                {item.url.length > 0 &&
                                  item.url.map((url: any, index) => {
                                    return (
                                      <div
                                        key={url._id || index}
                                      // className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none"
                                      >
                                        <img
                                          src={`${url}`}
                                          alt="not img"
                                          className="w-full "
                                        />
                                      </div>
                                    );
                                  })}
                                <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
                                  {moment(item.createdAt).fromNow()}
                                </div>
                                <div className="justify-center info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
                                  <span className="block text-center mr-1 p-1 px-2 font-bold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                    </svg>
                                    {item.comments.length}
                                  </span>
                                  <span className="block text-center mr-1 p-1 px-2 font-bold border-l border-gray-400">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clipRule="evenodd"
                                      />
                                    </svg>{' '}
                                    <p className=''>
                                      {item.likes.length}
                                    </p>
                                  </span>
                                </div>
                                <div className="desc p-4 text-gray-800">
                                  <a href="https://www.youtube.com/watch?v=dvqT-E74Qlo" target="_new" className="title font-bold block cursor-pointer hover:underline">{item.title}</a>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>

                      );
                    })
                  )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <iframe width="420" height="345" src="https://yt3.ggpht.com/ytc/AKedOLTecXHBpNJ5nSjHy0HfaJdRyimq1mAsHhzdNN1Z=s800-c-k-c0xffffffff-no-rj-mo">
      </iframe>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await getUserId();
  const paths = users.user.map((user: { _id: string }) => ({
    params: { id: user._id },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = await getDataUser(params?.id);
  return {
    props: {
      userId,
    },
  };
};

export default Personal;
