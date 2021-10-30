/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ExclamationIcon,
  BeakerIcon,
} from '@heroicons/react/solid';
import { Form, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import Loading from '../../loading/Loading'

import { apiUrl } from 'src/Context/contant';
import { getPostId, getPosts } from 'src/service/getPost';

import load from '../../animation/loading.module.css';
import { UserContext } from '../../Context/AuthContext';
import { IconLeft } from '@/components/IconLeft/IconLeft';
import { Post } from '@/components/News/NewsPost';
import { Right } from '@/components/Right/Right';
import { toast } from 'react-toastify';

interface IndexProps {
  post: Post;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const IdPost: React.FC<IndexProps> = (props) => {
  const [post, setPost] = useState(props.post);

  useEffect(() => {
    setPost(props.post);
  }, [props.post]);

  const { user } = React.useContext(UserContext);

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [edit, setEdit] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const [liked, setLiked] = useState<boolean>(false);

  const cancelEditpost = useRef(null);

  const [loading, setLoading] = useState<boolean>(false)

  const [form] = Form.useForm();

  useEffect(() => {
    setLiked(
      post?.likes?.map((l: any) => l?.authorId).includes((user as any)._id)
    );
  }, [post, user]);

  // res form
  const onReset = () => {
    form.resetFields();
  };

  // delete
  const handleDeleteCmt = async () => {
    setLoading(true)
    try {
      const deleteCmt = await axios.delete(
        `${apiUrl}/posts/${post.comments.map((item: any) => item._id)}`
      );
      if (!deleteCmt.data.success) {
        toast.error(`Delete post failed`);
      }

      setLoading(false)
      router.push('/');
      toast.success(`Delete post successfull`);
    } catch (error) {
      toast.error(`This post is not about you !`);
    }
  };
  const handleDelete = async () => {
    setLoading(true)
    try {
      const deletePost = await axios.delete(`${apiUrl}/posts/${post._id}`);
      if (!deletePost.data.success) {
        toast.error(`Delete post failed`);
      }
      setLoading(false)
      toast.success(`Delete post successfull`);
      router.push('/');
    } catch (error) {
      toast.error(`This post is not about you !`);
    }
  };
  // like
  const handleLike = async () => {
    setLoading(true)
    try {
      const like = await axios.post(`${apiUrl}/posts/like/${post._id}`, {});

      setPost(
        like.data.type === 'like'
          ? { ...post, likes: [...post.likes, like.data.newLike] }
          : {
            ...post,
            likes: [
              ...post.likes.filter(
                (l: any) => l?._id.toString() !== like.data.likeId
              ),
            ],
          }
      );
      setLoading(false)
    } catch (error) {
      toast.error(`Please login !`);
    }
  };

  // edit post
  const handleEdit = async (data: any) => {
    setLoading(true)
    try {
      const editPost = await axios.put(`${apiUrl}/posts/${post._id}`, data);
      if (!editPost.data.success) {
        toast.error(`Edit post failed`);
      }
      setLoading(false)
      toast.success(`Edit post successfull`);
      router.push('/');
    } catch (error) {
      toast.error(`This post is not about you !`);
    }
  };

  // comment
  const handleComment = async (values: string) => {
    setLoading(true)
    try {
      const cmt = await axios.post(
        `${apiUrl}/posts/comment/${post._id}`,
        values
      );
      if (cmt) {
        setPost({ ...post, comments: [...post.comments, cmt.data.newCmt] });
        onReset();
      }
      if (user._id === post.user._id) {
        onReset();
        return setLoading(false)
      }
      await axios.post(`${apiUrl}/posts/notification`, {
        message: 'Just commented on your post',
        receiverId: post.user._id,
        sender: user._id,
        postId: post._id,
      });

      setLoading(false)
    } catch (error) {
      return toast.error(`Please login !`);
    }
  };

  const router = useRouter();

  if (router.isFallback) {
    return <div className={load.animated}></div>;
  }
  return (
    <div className="dark:text-black">
      <div className="flex p-8 bg-red-200 bg-opacity-70">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post?.title}</title>
        </Helmet>
        <IconLeft className="hidden sm:block md:hidden" />
        <div className="w-full mx-3">
          <div className="p-4 bg-purple-400 rounded-lg shadow-md bg-opacity-20 my-7 sm:p-12">
            <div className="relative block m-auto bg-white rounded-md shadow-lg my-7 p-14">
              <img
                className="absolute w-12 h-12 mx-4 rounded-full top-2 left-2"
                src={`${post?.user.avatar}`}
              />

              <p className="absolute w-2/12 truncate text-sm font-bold sm:top-2 sm:left-20 sm:text-xl top-3 left-20">
                {post?.user.fullname}
              </p>
              <p className="absolute text-sm truncate  w-2/12 sm:top-8 sm:left-20 top-7 left-20">
                {moment(post?.createdAt).fromNow()}
              </p>
              <div className="flex flex-wrap justify-around">
                {post?.url.length > 0 &&
                  post.url.map((url: string) => {
                    return (
                      <img
                        key={url}
                        className="flex my-4 shadow-2xl"
                        src={`${url}`}
                      />
                    );
                  })}
              </div>
              <p className="p-2 my-8 text-center">{post?.title}</p>
              <div className="absolute flex p-2 cursor-pointer">
                <div className="flex" onClick={() => handleLike()}>
                  {liked ? (
                    <>
                      {/* <div className=' hover:block'>
                          {post.user.username}
                        </div> */}
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
                    </>
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

                  <p className="font-bold">{post?.likes.length}</p>
                </div>
                <div
                  className="flex mx-5"
                  onMouseEnter={() => setIsShown(true)}
                  onClick={() => setIsShown(true)}
                >
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
                  <p className="font-bold cursor-pointer ">
                    {post?.comments.length}
                  </p>
                </div>
              </div>
              {isShown && (
                <>
                  <div className="flex border-t-2 border-black mt-28 "></div>
                  <div className="my-6 text-center ">
                    <Form
                      form={form}
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                      onFinish={handleComment}
                      autoComplete="off"
                    >
                      <div className="block md:flex lg:flex 2xl:flex">
                        {user.avatar && (
                          <>
                            <img
                              className="w-12 h-12 mb-4 rounded-full m-auto"
                              src={`${user.avatar}`}
                            />
                            <Form.Item
                              name="content"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your content!',
                                },
                              ]}
                              className="w-full"
                            >
                              <textarea className="w-full border border-black rounded-md dark:text-white" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                              <Button
                                className="p-3"
                                type="primary"
                                htmlType="submit"
                              >
                                Send
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </div>
                    </Form>
                  </div>
                  <div className="flex border-t-2 border-black "></div>

                  {post.comments &&
                    post?.comments.map((item: any) => {
                      return (
                        <div key={item._id} className="flex mt-6">
                          <img
                            className="w-12 h-12 rounded-full"
                            src={`${item.authorId.avatar}`}
                          />
                          <div className="w-full p-1 mx-5 bg-indigo-600 bg-opacity-25 border-2 border-indigo-900 rounded-md ">
                            <div className="flex justify-between border-b-2 border-indigo-400">
                              <span className="font-bold truncate w-6/12">
                                {item.authorId.fullname}
                              </span>
                              <p className="text-xs ">
                                {moment(item.createdAt).fromNow()}
                              </p>
                            </div>
                            <p className="truncate w-6/12">{item.content}</p>
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
              <div></div>

              <div className="absolute w-28 top-0 right-0 p-3 cursor-pointer">
                <Menu as="div" className="relative inline-block text-left">
                  <div className='pl-4'>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
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
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => setOpen(true)}
                            >
                              Delete post
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => setEdit(true)}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Edit Post
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Transition.Root show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                  >
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                      </Transition.Child>

                      <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                      >
                        &#8203;
                      </span>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon
                                  className="w-6 h-6 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-gray-900"
                                >
                                  Delete Post
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    If you agree, this post will be deleted and
                                    no longer exist on the homepage
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={handleDelete}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>
              </div>
            </div>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon
                            className="w-6 h-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Delete comment
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              If you agree, this comment will be deleted and no
                              longer exist on the homepage
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleDeleteCmt}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <Transition.Root show={edit} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setEdit}
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                          <BeakerIcon
                            className="w-6 h-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Edit Post
                          </Dialog.Title>
                          <div className="mt-2">
                            <Form
                              encType="multipart/form-data"
                              name="basic"
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 16 }}
                              initialValues={{ remember: true }}
                              onFinish={handleEdit}
                              autoComplete="off"
                            >
                              <Form.Item
                                label="Description"
                                name="title"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input your Description!',
                                  },
                                ]}
                              >
                                <textarea className="border-2 border-gray-400" />
                              </Form.Item>
                              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                  Edit
                                </Button>
                              </Form.Item>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setEdit(false)}
                        ref={cancelEditpost}
                      >
                        Cancel Edit
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
        <Right />
        {loading && <Loading />}
      </div>
    </div>
  );
};
export default IdPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(1, 2);
  const paths = posts.posts.map((post: { _id: string }) => ({
    params: { id: post._id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostId(params?.id);
  return {
    props: {
      post: post.post,
    },
  };
};
