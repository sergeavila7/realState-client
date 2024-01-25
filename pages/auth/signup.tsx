import { InputFormik, Button } from '@/components';
import Card from '@/components/Card';
import clientAxios from '@/config/axiosCreate';
import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';

interface Error {
  msg: string;
}
interface Values {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

export default function Signup() {
  const [errors, setErrors] = useState<Error[]>([]);
  const handleSubmit = async (values: Values) => {
    try {
      const res = await clientAxios.post('/auth/signup', values);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>Crear Cuenta</h3>
        {errors && (
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
        )}
        <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              repeat_password: '',
            }}
            onSubmit={(values, actions) => {
              handleSubmit(values);
            }}
          >
            {(props: FormikProps<Values>) => (
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
                {/* Resto del formulario */}
                <div className='flex justify-end mt-10'>
                  <Button type='submit' variant='fill'>
                    Registrar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}
