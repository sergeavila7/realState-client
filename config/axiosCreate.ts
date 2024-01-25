import Axios from 'axios';

const clientAxios = Axios.create({
  baseURL: 'http://localhost:4000',
});

export default clientAxios;
