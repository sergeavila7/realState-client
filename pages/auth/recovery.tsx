import { InputFormik, Button } from '@/components';
import Card from '@/components/Card';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';

interface Values {
  email: string;
}

export default function Recovery() {
  return (
    <div className='flex-center h-screen'>
      <div className='container'>
        <h1 className='text-3xl text-center'>
          <span className='font-bold'>Bienes</span> Raices
        </h1>
        <h3 className='text-2xl font-bold text-center mt-4'>
          Recupera tu acceso
        </h3>
        <Card className='max-w-md mx-auto p-10 mt-8' color='white'>
          <Formik
            initialValues={{
              email: '',
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
      </div>
    </div>
  );
}
