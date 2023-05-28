import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.56:5000/api', // Replace with your backend URL
});

export default api;
