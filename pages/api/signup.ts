import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password, repeat_password } = req.body;

    const response = await axios.post('http://localhost:4000/auth/signup', {
      name,
      email,
      password,
      repeat_password,
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    return res.status(400).json({ errors: error.response.data.errors });
  }
}
