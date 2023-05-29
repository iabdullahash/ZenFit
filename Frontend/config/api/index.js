import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.161.79:5000/api', // backend url
});

export default api;
