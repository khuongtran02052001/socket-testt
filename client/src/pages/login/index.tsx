/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import { apiUrl, LOCAL_STORAGE } from 'src/Context/contant';
import setAuthToken from 'src/utils/setAuthToken';

import { UserContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Loading from 'src/loading/Loading';
import { useState } from 'react';



type Inputs = {
  username: string;
  password: string;
};

const loginService = async (data: any) => {
  const res = await axios.post(`/api/login`, data);
  toast.success(`Login Success`)
  return res.data;
};

export default function index() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const { setUser } = React.useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const login = async (data: any) => {
    setLoading(true)
    const user = await loginService(data).catch(() => {
      toast.success(user.data.message)
      setLoading(false)
    });

    if (!user) return;
    // lay thong tin moi login xong
    if (user.accessToken) {
      setAuthToken(user.accessToken);
      axios.get(`${apiUrl}/auth`).then((res) => setUser(res.data));
    }
    router.push('/');
    localStorage.setItem(LOCAL_STORAGE, user.accessToken);
    setAuthToken(user.accessToken);
  };

  return (
    <div className="w-6/12 m-auto text-center bg-gray-300 rounded-md shadow-lg my-7">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <form
        className="flex flex-col w-6/12 m-auto text-center "
        onSubmit={handleSubmit(login)}
      >
        <input
          placeholder="UserName..."
          className="w-6/12 m-auto my-2 border-2 border-black rounded-lg"
          {...register('username', { required: true })}
        />
        <span className="my-2 font-bold text-pink-900">
          {errors.username && <span>This field is required</span>}
        </span>
        <input
          placeholder="Password..."
          type="password"
          {...register('password', { required: true })}
          className="w-6/12 m-auto border-2 border-black rounded-lg"
        />
        {/* errors will return when field validation fails  */}
        <span className="my-2 font-bold text-pink-900">
          {errors.password && <span>This field is required</span>}
        </span>
        <button
          className="w-6/12 m-auto my-5 border-2 border-black rounded-lg cursor-pointer "
          type="submit"
        >
          Login
        </button>
        OR
        <button className="font-bold transition-all transform hover:scale-110 hover:text-blue-500">
          <Link href="/register" passHref>
            Register
          </Link>
        </button>
      </form>
      {loading && <Loading />}
    </div>
  );
}
// export async function getServerSideProps(context: NextPageContext) {
//   return {
//     props: {
//       query: context.query
//     }, // will be passed to the page component as props
//   }
// }

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("user", loginService);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
