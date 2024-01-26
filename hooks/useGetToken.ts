import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ErrorData {
  msg: string;
  error: boolean;
}

interface UserData {
  name: string;
  email: string;
}

const useGetToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      getToken(token);
    }
  }, [router.query.token]);

  const getToken = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:4000/auth/confirm/${token}`);
    } catch (error: any) {
      const errorData: ErrorData[] = error.response?.data.errors || [{ msg: 'Error interno del servidor', error: true }];
      setError(errorData);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error }; // Retornar userData en el objeto de retorno
};

export default useGetToken;
