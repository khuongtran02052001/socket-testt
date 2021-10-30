import React, { useState } from 'react';

import { Form, Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { apiUrl } from 'src/Context/contant';
import { toast } from 'react-toastify';
import Loading from 'src/loading/Loading';


// import { apiUrl } from 'src/Context/contant';

export default function index() {
  const [file, setFile] = useState<File | string>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const formData = new FormData()

      formData.append("file", (file as any))

      formData.append("upload_preset", "khuongstore")

      const res = await (await fetch('https://api.cloudinary.com/v1_1/dsqlqtyyp/image/upload', {
        method: 'POST',
        body: formData
      })).json()
      const secure_url = res.secure_url
      setLoading(false)
      if (!res) {
        toast.error('Register Fail');
        return;
      }

      toast.success(`Register successfully`);

      await axios.post(`${apiUrl}/auth/register`, {
        avatar: secure_url,
        ...values
      })


      router.push('/');

    } catch (error) {
      toast.error(`Register fail`);
    }

  };

  return (
    <>
      <div className="w-6/12 m-auto text-center bg-gray-300 rounded-md shadow-lg my-7">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
        </Helmet>
        <Form
          encType="multipart/form-data"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="flex flex-col w-6/12 m-auto text-center"
        >
          <Form.Item
            name="username"
            label='Email'
            rules={[
              { required: true, message: 'Please input your username!' },
              {
                type: 'email',
                message: 'Please enter your email!',
              },
            ]}
          >
            {/* <input className="w-6/12 m-auto my-5 border-2 border-black rounded-lg " /> */}
            <div className="flex flex-col">
              <div className="relative">
                <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                  <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                    <svg viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-5 w-5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12"
                        cy="7"
                        r="4"></circle>
                    </svg>
                  </div>
                </div>

                <input
                  placeholder="username@example"
                  className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                />

              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="my-5"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            {/* <input
              type="password"
              className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
            /> */}

            <div className="relative">
              <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                  <svg viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-5 w-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12"
                      cy="7"
                      r="4"></circle>
                  </svg>
                </div>
              </div>

              <input
                type='password'
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
              />
            </div>
          </Form.Item>

          <Form.Item

            label='Confirm Password'
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            {/* <input
              type="password"
              className="w-6/12 m-auto my-5 border-2 border-black rounded-lg "
            /> */}
            <div className="relative">
              <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                  <svg viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-5 w-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12"
                      cy="7"
                      r="4"></circle>
                  </svg>
                </div>
              </div>

              <input
                type='password'
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
              />
            </div>
          </Form.Item>

          <Form.Item
            label="Name:"
            name="fullname"
            rules={[
              { required: true, message: 'Please input your name!' },
              {
                min: 3,
                message: 'ten dai ti ',
              },
              {
                max: 12,
                message: 'ten ngan thui ',
              },
            ]}
          >

            <div className="relative">
              <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                  <svg viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-5 w-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12"
                      cy="7"
                      r="4"></circle>
                  </svg>
                </div>
              </div>

              <input
                type='text'
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
              />
            </div>
          </Form.Item>

          <div className="file_upload relative border-4 border-dotted border-gray-300 rounded-lg sm:w-96">
            <svg className="text-indigo-500 sm:w-24 sm:mx-28 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <div className="input_field flex flex-col w-max">
              <label className=''>
                <input
                  onChange={(e: any) => setFile(e.target.files[0])}
                  accept="image/png, image/jpeg"
                  className="text-sm cursor-pointer w-36 hidden " type="file" multiple />
                <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 sm:ml-32 ml-3 px-3 hover:bg-indigo-500">Select</div>
              </label>

            </div>
            <div className="title text-indigo-500 uppercase mt-5">
              {file?.toString().length === 0 ? <div>
                drop files here
              </div>
                : (file as any)?.name
              }
            </div>
          </div>

          <Form.Item className="my-5" wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit"
              style={{ marginLeft: 13 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {loading && <Loading />}
      </div>
    </>
  );
}
