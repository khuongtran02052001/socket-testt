/* eslint-disable no-alert */
// React query with react-infinite scrolling

// import { IconLeft } from "@/components/IconLeft/IconLeft";
// import { Post } from '@/components/News/News';
// import { NewsPost } from '@/components/News/NewsPost';
// import { Right } from '@/components/Right/Right';
// import { GetStaticProps } from 'next';
// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useQuery } from 'react-query';
// import { getPosts } from 'src/service/getPost';
// import { Meta } from '../layout/Meta';
// import { Main } from '../templates/Main';
// import { BackTop } from 'antd';
// interface IndexProps {
//   posts: Post[];
//   totalRows: number;
// }

// const Index: React.FC<IndexProps> = (props) => {
//   const { data: posts } = useQuery('posts', () => getPosts(1, 1), {
//     initialData: props.posts,
//   });
//   const [page, setPage] = useState(1);
//   const [items, setItems] = useState<Post[]>([]);

//   useEffect(() => {
//     setItems(props.posts);
//   }, []);

//   // console.log(items)
//   const fetchData = async () => {
//     const postScroll = await getPosts(2, page);
//     setPage((prev) => prev + 1);
//     setItems([...items, ...postScroll.posts]);
//   };

//   return (
//     <Main meta={<Meta title='DEV' description='a.' />}>
//       <div className='flex justify-between p-10 dark:bg-gray-900'>
//         <IconLeft />
//         <div className='w-3/5'>
//           <InfiniteScroll
//             dataLength={items.length}
//             next={fetchData}
//             hasMore={items.length < props.totalRows}
// loader={
//   <div className='p-4 rounded-lg shadow-md my-7 '>
//   <div className='w-full p-4 mx-auto border border-blue-300 rounded-md shadow'>
//   <div className='flex space-x-4 animate-pulse'>
//     <div className='w-12 h-12 bg-blue-400 rounded-full'></div>
//     <div className='flex-1 py-1 space-y-4'>
//       <div className='w-3/4 h-4 bg-blue-400 rounded'></div>
//       <div className='space-y-2'>
//         <div className='h-4 bg-blue-400 rounded'></div>
//         <div className='w-5/6 h-4 bg-blue-400 rounded'></div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// }
// endMessage={
//   <p style={{ textAlign: 'center' }}>
//     <p>
//       Yay! You have seen it all
//       <BackTop className='my-10'>
//         <div className='flex justify-center cursor-pointer animate-bounce'>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='w-5 h-5'
//             viewBox='0 0 20 20'
//             fill='currentColor'
//           >
//             <path
//               fillRule='evenodd'
//               d='M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z'
//               clipRule='evenodd'
//             />
//           </svg>
//         </div>
//       </BackTop>
//     </p>
//   </p>
// }
//           >
//             {items.map((item: any) => {
//               return (
//                 <div className='w-full '>
//                   <div className='p-4 rounded-lg shadow-md my-7 '>
//                     <NewsPost post={item} />
//                   </div>
//                 </div>
//               );
//             })}
//           </InfiniteScroll>
//         </div>
//         <Right />
//       </div>
//     </Main>
//   );
// };

// export default Index;

// export const getStaticProps: GetStaticProps = async () => {
//   const posts = await getPosts(1, 2);
//   return {
//     props: {
//       posts: posts.posts,
//       totalRows: posts.totalRows,
//     },
//   };
// };

// React-useInfiniteQuery with react-infinite-scroll

import React from 'react';

import { BackTop } from 'antd';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { LOCAL_STORAGE } from 'src/Context/contant';
import { getPosts } from 'src/service/getPost';

import { Post, NewsPost } from '../components/News/NewsPost';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IconLeft } from '@/components/IconLeft/IconLeft';
import { Right } from '@/components/Right/Right';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'
import { routeAnimation, fadeUp } from '../motion'

interface IndexProps {
  posts: Post[];
  totalRows: number;
  result: any;
  nextPage: number;
  totalPages: number;
}

const Index: React.FC<IndexProps> = () => {
  React.useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE)) {
      toast.error(`Please login , otherwise you are only in view`);
    }
  }, []);
  const limit = 7;
  const { fetchNextPage, hasNextPage, data, refetch } = useInfiniteQuery(
    'posts',
    ({ pageParam = 1 }) => getPosts(limit, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length * limit >= lastPage.totalRows) {
          return undefined;
        }
        return allPages.length + 1;
      },
      refetchInterval: 5000,
    }
  );

  return (
    <Main meta={<Meta title="DEV" description="a." />}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DEV</title>
      </Helmet>
      <div className="flex py-8 px-4">
        <IconLeft className="hidden sm:block md:block" />
        <div className="w-full mx-3">
          <motion.div
            variants={routeAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="rounded-lg shadow-md my-7 sm:p-28">
            <div
              style={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              <InfiniteScroll
                dataLength={data?.pages?.length || 0}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                  <div className="p-4 rounded-lg shadow-md my-7 ">
                    <div className="w-full p-4 mx-auto border border-blue-300 rounded-md shadow">
                      <div className="flex space-x-4 animate-pulse">
                        <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                        <div className="flex-1 py-1 space-y-4">
                          <div className="w-3/4 h-4 bg-blue-400 rounded"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-blue-400 rounded"></div>
                            <div className="w-5/6 h-4 bg-blue-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>
                      Yay ! You have seen it all
                      <BackTop className="my-10">
                        <div className="flex justify-center cursor-pointer animate-bounce">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </BackTop>
                    </b>
                  </p>
                }
              >
                {data?.pages.map((page: { posts: Post[] }) => {
                  return page?.posts.map((post: any) => {
                    return (
                      <motion.div
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                        key={post.id}>
                        <NewsPost {...post} refetch={refetch} />
                      </motion.div>
                    );
                  });
                })}
              </InfiniteScroll>
            </div>
          </motion.div>
        </div>
        <Right />
      </div>
    </Main>
  );
};

export default Index;
