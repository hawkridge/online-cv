import axios from 'axios'

export const appName = 'online_cv';

export const API = axios.create({
	baseURL: 'http://213.196.39.227/api',
	headers: {
		'X-my-awesome': 'Sorax'
	}
})

