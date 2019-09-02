import { API } from '../config'

class ApiService {
	logIn(reqParams) {
		return API.post('/login', reqParams)
	}

	signUp(reqParams) {
		return API.post('/user/registration', reqParams)
	}
	
	getUserProfile() {
		return API.get('/user/profile')
	}
	
	updateUserPhoto(reqParams) {
		return API.post('/user/photo/update/', reqParams)
	}
	
	uploadSingleImage(reqParams) {
		return API.post('/upload/img', reqParams)

	}
	
	uploadImages(reqParams) {
		return API.post('/upload/imgs')
	}
}

export default new ApiService()
