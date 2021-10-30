/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiUrl } from 'src/Context/contant';
import Loading from 'src/loading/Loading';
// import { User } from 'src/Context/AuthContext';
export default function index() {
  const [file, setFile] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter();
  type Inputs = {
    title: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const newPost = async (values: any) => {
    setLoading(true)
    const formData = new FormData()

    formData.append("file", (file as any))

    formData.append("upload_preset", "khuongstore")

    const res = await (await fetch('https://api.cloudinary.com/v1_1/dsqlqtyyp/image/upload', {
      method: 'POST',
      body: formData
    })).json()
    const secure_url = res.secure_url
    await axios.post(`${apiUrl}/posts`, {
      url: secure_url,
      ...values
    });
    setLoading(false)
    if (!res) return toast.error(`create post fail`);
    try {
      toast.success(`Create post success`);
      router.push('/');
    } catch (error) {
      toast.error(`Create post fail`);
    }
  };




  console.log()
  return (
    <>
      <div className=" bg-gray-300 rounded-md shadow-lg my-7 sm:-w-full sm:m-auto sm:text-center">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Post</title>
        </Helmet>
        <form
          encType="multipart/form-data"
          className="flex flex-col "
          onSubmit={handleSubmit(newPost)}
        >
          <div className="relative my-5">
            <textarea
              className="w-4/5 my-2 border-2 order-2 border-gray-500 rounded-md h-72"
              placeholder="New post title here..."
              {...register('title', { required: true })}
            />
            <span className="my-2 font-bold text-pink-900">
              {errors.title && <span>This field is required</span>}
            </span>
          </div>
          <div className="relative overflow-hidden group ">
            <div className="extraOutline  p-4  w-max bg-whtie m-auto rounded-lg">
              <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{ width: 450 }}>
                <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <div className="input_field flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e: any) => setFile(e.target.files[0])}
                      accept="image/png, image/jpeg"
                      className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                    <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                  </label>

                  <div className="title text-indigo-500 uppercase">
                    {file.toString().length === 0 ? <div>
                      drop files here
                    </div>
                      : file && (file as any).name
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="w-6/12 m-auto my-5 border-2 border-black rounded-lg cursor-pointer sm:w-1/6"
            type="submit"
          >
            Send
          </button>
        </form>
        {loading && <Loading />}
      </div>
    </>
  );
}
