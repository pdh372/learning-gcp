// lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
});

export default axiosInstance;
