import React from 'react';
import { AuthErrors, Button, InputFormik } from '@/components';
import Card from '@/components/Card';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import useRecoveryPassword from '@/hooks/useRecoveryPassword';

export default function Token() {
  const { success, errors, tokenValid, tokenError, checkToken, newPassword } =
    useRecoveryPassword();

  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>
          {success ? (
            <div className='flex flex-col'>
              Password Reestablecido{' '}
              <Link
                href='/auth/login'
                className='text-lg font-semibold my-4 text-center text-gray-500'
              >
                Ya puedes iniciar sesion
              </Link>
            </div>
          ) : (
            'Reestablece tu password'
          )}
        </h3>
        {!success && (
          <>
            {tokenValid ? (
              <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
                {errors && <AuthErrors errors={errors} />}
                <Formik
                  initialValues={{
                    password: '',
                  }}
                  onSubmit={newPassword}
                >
                  <Form className='w-full'>
                    <div className='mt-2'>
                      <InputFormik
                        name='password'
                        label='Coloca tu nuevo password'
                        type='password'
                        placeholder='Nuevo password'
                      />
                    </div>
                    <div className='flex justify-end mt-10'>
                      <Button variant='fill' type='submit'>
                        Guardar password
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </Card>
            ) : (
              <AuthErrors errors={tokenError} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
