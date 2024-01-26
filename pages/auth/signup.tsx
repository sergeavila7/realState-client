import React from 'react';
import { Form, Formik } from 'formik';
import { InputFormik, Button, AuthErrors } from '@/components';
import Card from '@/components/Card';
import useSignupForm from '@/hooks/useSignup';

export default function Signup() {
  const { success, errors, handleSubmit } = useSignupForm();

  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>
          {success ? (
            <>
              Cuenta creada correctamente
              <p className='text-lg font-semibold my-4 text-center text-gray-500'>
                Hemos enviado un email de confirmación, presiona el enlace
              </p>
            </>
          ) : (
            'Crear cuenta'
          )}
        </h3>
        {!success && (
          <>
            {errors && <AuthErrors errors={errors} />}
            <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  repeat_password: '',
                }}
                onSubmit={handleSubmit}
              >
                <Form className='w-full' noValidate>
                  <InputFormik name='name' label='Nombre(s)' type='text' />
                  <div className='mt-2'>
                    <InputFormik name='email' label='Email' type='email' />
                  </div>
                  <div className='mt-2'>
                    <InputFormik
                      name='password'
                      label='Contraseña'
                      type='password'
                    />
                  </div>
                  <div className='mt-2'>
                    <InputFormik
                      name='repeat_password'
                      label='Repetir contraseña'
                      type='password'
                    />
                  </div>
                  <div className='flex justify-end mt-10'>
                    <Button type='submit' variant='fill'>
                      Registrar
                    </Button>
                  </div>
                </Form>
              </Formik>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
