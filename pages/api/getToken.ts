// pages/api/confirm/[token].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.query; // Corregimos aquí

    const response = await axios.get(`http://localhost:4000/auth/confirm/${token}`);

    res.status(response.status).json(response.data);
  } catch (error: any) {
    return res.status(400).json({ errors: error.response.data.errors });
  }
}
