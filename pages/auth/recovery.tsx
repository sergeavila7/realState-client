import { InputFormik, Button, AuthErrors } from '@/components';
import Card from '@/components/Card';
import clientAxios from '@/config/axiosCreate';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
interface Error {
  msg: string;
}
interface Values {
  email: string;
}

export default function Recovery() {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmit = async (values: Values) => {
    setErrors([]);
    try {
      await clientAxios.post('/auth/recovery', values);

      setSuccess(true);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: 'Error interno del servidor' }]);
      }
      setSuccess(false);
    }
  };

  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>
          {success ? (
            <>
              Reestablece tu password{' '}
              <p className='text-lg font-semibold my-4 text-center text-gray-500'>
                Hemos enviado un email con las instrucciones
              </p>
            </>
          ) : (
            'Recupera tu acceso'
          )}
        </h3>
        {!success && (
          <>
            {errors && <AuthErrors errors={errors} />}
            <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
              <Formik
                initialValues={{
                  email: '',
                }}
                onSubmit={handleSubmit}
              >
                {(props: FormikProps<Values>) => (
                  <Form className='w-full'>
                    <div className='mt-2'>
                      <InputFormik
                        name='email'
                        label='Email de registro'
                        type='text'
                        placeholder='email'
                        //   disabled={disabled}
                      />
                    </div>
                    <div className='flex justify-end mt-10'>
                      <Button variant='fill'>Enviar a correo</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
