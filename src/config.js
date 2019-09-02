import axios from 'axios'

export const appName = 'online_cv';
export const originName = 'http://213.196.39.227';

export const API = axios.create({
	baseURL: `${ originName }/api`
})

API.interceptors.request.use(function (config) {
	const authToken = localStorage.getItem('authToken');
	config.headers.Authorization = authToken;

	return config;
})

API.interceptors.response.use(function (response) {
    return response
}, function (error) {


    return Promise.reject(error)
})