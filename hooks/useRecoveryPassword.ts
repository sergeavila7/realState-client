import  { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import clientAxios from '@/config/axiosCreate';

const useRecoveryPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [tokenError, setTokenError] = useState<{ msg: string }[]>([]);
    const [errors, setErrors] = useState<{ msg: string }[]>([]);
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
  
    useEffect(() => {
        if (token) {
          checkToken(token as string);
        }
      }, [token]);

    const checkToken = async (tokenValue: string) => {
      setErrors([]);
      try {
        await clientAxios.get(`/auth/recovery/${tokenValue}`);
        setTokenValid(true);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
          setTokenError(error.response.data.errors);
        } else {
          setTokenError([{ msg: 'Error interno del servidor' }]);
        }
      }
    };
  
    const newPassword = async (values: { password: string }) => {
      setErrors([]);
      try {
        await clientAxios.post(`/auth/recovery/${token}`, values);
        setSuccess(true);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors([{ msg: 'Error interno del servidor' }]);
        }
      }
    };
  

  return {checkToken, newPassword, tokenError, tokenValid,errors, success}
}

export default useRecoveryPassword