import axios from 'axios';
import { API_BASE_URL } from './constants/defaultValues';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export default api;
