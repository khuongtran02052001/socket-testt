import React from 'react';

export interface FooterProps {
  className?: string;
}
export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="bg-gray-300 text-center text-black p-10" {...props}>
      <div className="flex justify-center flex-col ">
        <h1 className="hover:text-red-400 cursor-pointer font-bold">
          DEV Community
        </h1>
        <p>
          A constructive and inclusive social network for software developers.
          With you every step of your journey.
        </p>
      </div>
      <div className="flex justify-center p-7">
        Built on
        <p className="px-1 hover:text-red-400 cursor-pointer font-bold">
          Forem
        </p>
        <p>-- the</p>
        <p className="px-1 hover:text-red-400 cursor-pointer font-bold">
          open source
        </p>
        <p>software that powers </p>
        <p className="px-1 hover:text-red-400 cursor-pointer font-bold">DEV</p>
        <p> and other .</p>
      </div>
      <div className="flex justify-center">
        Made with love and
        <p className="px-1 hover:text-red-400 cursor-pointer font-bold">
          {' '}
          Ruby on Rails.{' '}
        </p>
        <p> DEV Community © 2016 - 2021.</p>
      </div>
    </div>
  );
};
