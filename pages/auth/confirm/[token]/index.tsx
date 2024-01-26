import React, { useEffect } from 'react';
import useGetToken from '@/hooks/useGetToken';
import { AuthErrors, Spinner } from '@/components';
import Link from 'next/link';

export default function Token() {
  const { loading, error } = useGetToken(); // Usamos el hook useGetToken

  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>
          {error ? 'Error al confirmar tu cuenta' : 'Cuenta confirmada'}
        </h3>
        {loading && (
          <div className='flex-center my-10'>
            <Spinner size='xl' />
          </div>
        )}
        {error ? (
          <div className='max-w-md mx-auto rounded-md bg-red-400 text-white font-semibold uppercase my-4 p-4'>
            <AuthErrors errors={error} />
          </div>
        ) : (
          <div className='max-w-md flex-center flex-col mx-auto rounded-md  text-white font-semibold my-4 p-4'>
            <div className='rounded-md bg-green-400 text-white font-semibold uppercase my-4 p-4'>
              La cuenta se confirmó correctamente
            </div>
            <Link
              className='text-black text-xs font-semibold uppercase'
              href='/auth/login'
            >
              Ya puedes iniciar sesion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
