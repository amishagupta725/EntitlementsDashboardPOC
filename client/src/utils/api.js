import axios from 'axios';

const api = axios.create({
  baseURL: 'localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;