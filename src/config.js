import axios from 'axios'
import { toastr } from 'react-redux-toastr'

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
	toastr.success('Success', 'Operation was successfully completed')

	return response
}, function (error) {
	toastr.error('Error', `An error was occurred with errCode ${error.response.data.code}`)

    return Promise.reject(error)
})