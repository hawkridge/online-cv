import { appName } from '../config'
import { createSelector } from 'reselect'
import { takeEvery, call, put, all } from 'redux-saga/effects'
import { Record } from 'immutable'
import api from '../services/api'
import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from './auth'

/* Constants */

export const moduleName = 'user';
const prefix = `${appName}/${moduleName}`;

export const GET_USER_PROFILE_REQUEST = `${prefix}/GET_USER_PROFILE_REQUEST` ;
export const GET_USER_PROFILE_START = `${prefix}/GET_USER_PROFILE_START` ;
export const GET_USER_PROFILE_SUCCESS = `${prefix}/GET_USER_PROFILE_SUCCESS` ;
export const GET_USER_PROFILE_FAIL = `${prefix}/GET_USER_PROFILE_FAIL` ;

export const UPDATE_USER_PHOTO_REQUEST = `${prefix}/UPDATE_USER_PHOTO_REQUEST`;
export const UPDATE_USER_PHOTO_START = `${prefix}/UPDATE_USER_PHOTO_START`;
export const UPDATE_USER_PHOTO_SUCCESS = `${prefix}/UPDATE_USER_PHOTO_SUCCESS`;
export const UPDATE_USER_PHOTO_FAIL = `${prefix}/UPDATE_USER_PHOTO_FAIL`;
/* Action creators */

export const getProfile = () => ({
	type: GET_USER_PROFILE_REQUEST
});

export const updateUserPhoto = (formData) => ({
	type: UPDATE_USER_PHOTO_REQUEST,
	payload: {
		formData
	}
});

/* Selectors */

export const selector = state => state[moduleName];
export const processStateSelector = createSelector(
	selector,
	state => state.inProcess
)
export const userProfileSelector = createSelector(
	selector,
	state => state.userProfile
)
export const photoUploadingStateSelector = createSelector(
    selector,
    state => state.uploadingPhoto
)


/* Reducer */

const initialState = Record({
	inProcess: false,
	userProfile: false,
    uploadingPhoto: false
});

export default function reducer(state = initialState(), action) {
	const { type, payload } = action;
	
	switch(type) {
		case LOG_IN_SUCCESS:
			return state.set('userProfile', payload.userProfile);
		case GET_USER_PROFILE_START:
			return state.set('inProcess', true);
		case GET_USER_PROFILE_SUCCESS:
			return state
				.set('inProcess', false)
				.set('userProfile', payload.userProfile);
		case GET_USER_PROFILE_FAIL:
			return state.set('inProcess', false);
        case UPDATE_USER_PHOTO_START:
            return state.set('uploadingPhoto', true);
        case UPDATE_USER_PHOTO_SUCCESS:
            return state
                .set('uploadingPhoto', false)
                .setIn(['userProfile', 'photo', 'uri'], payload.updatedPhoto);
        case UPDATE_USER_PHOTO_FAIL:
            return state.set('uploadingPhoto', false);
		case LOG_OUT_SUCCESS:
			return state.set('userProfile', false)
		default:
			return state
	}
}

/* Sagas */

export function* profileSaga({ image }) {
	yield put({ type: GET_USER_PROFILE_START });

	try {
		const response = yield call(api.getUserProfile, image);

		yield put({
			type: GET_USER_PROFILE_SUCCESS,
			payload: {
				userProfile: response.data
			}
		})
	} catch (err) {
		yield put({
			type: GET_USER_PROFILE_FAIL
		})
	}

}

export function* updatePhotoSaga(data) {
	yield put({
		type: UPDATE_USER_PHOTO_START
	})
	try {

		const response = yield call(api.uploadSingleImage, data.payload.formData);
		yield call(api.updateUserPhoto, { fileId: response.data.id });

		yield put({
			type: UPDATE_USER_PHOTO_SUCCESS,
            payload: {
			    updatedPhoto: response.data.uri
            }
		})
	} catch (err) {
		yield put({
			type: UPDATE_USER_PHOTO_FAIL
		})
	}
}

export function* saga() {
	yield all([
		takeEvery(GET_USER_PROFILE_REQUEST, profileSaga),
		takeEvery(UPDATE_USER_PHOTO_REQUEST, updatePhotoSaga)
	])
}
