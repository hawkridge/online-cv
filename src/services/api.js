import { API } from '../config'


class ApiService {
	logIn(reqParams) {
		return API.post('/login', reqParams)
	}

	signUp(reqParams) {
		return API.post('/user/registration', reqParams)
	}
}

export default new ApiService()
