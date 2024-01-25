import React, { FC } from 'react';

interface Error {
  msg: string;
}

interface AuthErrorsProps {
  errors: Error[];
}

export const AuthErrors: FC<AuthErrorsProps> = ({ errors }) => {
  return (
    <div className='max-w-md mx-auto'>
      {errors.map((error, index) => (
        <div
          className='rounded-md bg-red-400 text-center text-white font-semibold my-4 p-4'
          key={index}
        >
          {error.msg}
        </div>
      ))}
    </div>
  );
};
