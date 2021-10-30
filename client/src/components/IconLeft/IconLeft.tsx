/* eslint-disable consistent-return */
import React from 'react';

import { useRouter } from 'next/router';

import { LOCAL_STORAGE } from '../../Context/contant';
import { toast } from 'react-toastify';

import { DataLeft } from 'data/DataLeft';
import CardLeft from 'src/card/ CardLeft';

import { motion } from 'framer-motion'
import { fadeUp, routeAnimation } from 'src/motion';

export interface IconProps {
  className?: string;
}

export const IconLeft: React.FC<IconProps> = (props) => {
  const router = useRouter();
  const handleSubmit = () => {
    if (localStorage.getItem(LOCAL_STORAGE)) {
      return toast.warning(`You need to log out !`);
    }
    router.push('/register');
  };
  const handleSubmit1 = () => {
    if (localStorage.getItem(LOCAL_STORAGE)) {
      return toast.warning(`You need to log out !`);
    }
    router.push('/login');
  };
  return (
    <div
      className="sm:hidden dark:text-black' w-full md:w-1/6  text-sm hidden"
      {...props}
    >
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <span className="mx-1 font-bold text-blue-600 cursor-pointer">
          DEV Community
        </span>
        <span className="font-bold">
          is a community of 697,706 amazing developers
        </span>
        <br />
        <br />

        <span className="my-7">
          We&apos;re a place where coders share, stay up-to-date and grow their
          careers.
        </span>
        <motion.div
          variants={routeAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleSubmit1}
          className="p-2 my-2 text-center text-blue-600 bg-white rounded-md cursor-pointer hover:bg-gray-300"
        >
          <button>Login</button>
        </motion.div>
        <motion.div
          variants={routeAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleSubmit}
          className="p-2 my-5 text-center text-white bg-blue-500 rounded-md cursor-pointer"
        >
          <button>Create new account</button>
        </motion.div>
      </div>
      <motion.div
        variants={routeAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className='block'>
        {DataLeft.map(item => (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
          >
            <CardLeft item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
