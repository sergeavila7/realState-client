import { useState } from 'react';
import axios from 'axios';

interface Error {
  msg: string;
}

interface Values {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface HookResponse {
  success: boolean | undefined;
  errors: Error[];
  handleSubmit: (values: Values) => Promise<void>;
}

const useSignupForm = (): HookResponse => {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmit = async (values: Values) => {
    setErrors([]);
    try {
      await axios.post('/api/signup', values);
      
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

  return { success, errors, handleSubmit };
};

export default useSignupForm;
