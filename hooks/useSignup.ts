import { useState } from 'react';
import axios from 'axios';


interface Error {
    msg: string;
  }

interface Values  {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
};

interface HookResponse  {
  errors: Error[];
  handleSubmit: (values: Values) => Promise<void>;
};

const useSignupForm = (): HookResponse => {
  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmit = async (values: Values) => {
    try {
      const res = await axios.post('/api/signup', values);
      setErrors([]);
    } catch (error: any) {
        setErrors(error.response.data.errors);
    }
  };

  return { errors, handleSubmit };
};

export default useSignupForm;
