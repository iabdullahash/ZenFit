import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.161.79:5000/api', // backend url
  baseURL: 'http://192.168.91.133:5000/api', // api zaryab
});

export default api;
