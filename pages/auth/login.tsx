import { InputFormik, Button } from '@/components';
import Card from '@/components/Card';
import { Form, Formik, FormikProps } from 'formik';
import Link from 'next/link';
import React from 'react';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Login() {
  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>Iniciar sesion</h3>
        <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
          <Formik
            initialValues={{
              email: '',
              firstName: 'red',
              lastName: '',
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<Values>) => (
              <Form className='w-full'>
                <div className='mt-2'>
                  <InputFormik
                    name='sku'
                    label='Email'
                    type='text'
                    //   disabled={disabled}
                  />
                </div>
                <div className='mt-2'>
                  <InputFormik
                    name='sku'
                    label='Contrasena'
                    type='text'
                    //   disabled={disabled}
                  />
                </div>
                <div className='flex justify-around text-xs text-gray-500 font-semibold hover:text-gray-600 mt-8'>
                  <Link href='/auth/signup'>¿No tienes cuenta? Registrate</Link>
                  <Link href='/auth/recovery'>Olvide mi contrasena</Link>
                </div>
                <div className='flex justify-end mt-10'>
                  <Button variant='fill'>Iniciar sesion</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}
