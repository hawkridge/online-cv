import { appName } from '../config'
import { createSelector } from 'reselect'
import { takeEvery, call, put, all } from 'redux-saga/effects'
import { Record } from 'immutable'
import { push } from 'connected-react-router'
import api from '../services/api'

/* Constants */

export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const LOG_IN_REQUEST = `${prefix}/LOG_IN_REQUEST`;
export const LOG_IN_START = `${prefix}/LOG_IN_START`;
export const LOG_IN_SUCCESS = `LOG_IN_SUCCESS`;
export const LOG_IN_FAIL = `${prefix}/LOG_IN_FAIL`;

export const LOG_OUT_REQUEST = `${prefix}/LOG_OUT_REQUEST`;
export const LOG_OUT_START = `${prefix}/LOG_OUT_START`;
export const LOG_OUT_SUCCESS = `LOG_OUT_SUCCESS`;
export const LOG_OUT_FAIL = `${prefix}/LOG_OUT_FAIL`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_FAIL = `${prefix}/SIGN_UP_FAIL`;

/* Action creators */

export const logIn = ({email, password}) => ({
	type: LOG_IN_REQUEST,
	payload: {
		email,
		password
	}
});

export const logOut = () => ({
	type: LOG_OUT_REQUEST
});

export const signUp = ({email, password, confirmPassword, firstName, middleName, lastName}) => ({
	type: SIGN_UP_REQUEST,
	payload: {
		email,
		password,
		confirmPassword,
		firstName,
		middleName,
		lastName
	}
});

/* Selectors */

export const authSelector = state => state[moduleName];
export const authStateSelector = createSelector(
	authSelector,
	auth => auth.isAuthorized
);

/* Reducer */

const initialState = Record({
	isAuthorized: !!localStorage.getItem('authToken') || false,
	inProcess: false,
	authToken: false
});

export default function reducer(state = initialState(), action) {
	const { type, payload } = action;
	
	switch(type) {
		case LOG_IN_START:
			return state.set('inProcess', true);
		
		case LOG_IN_SUCCESS:
			return state
				.set('isAuthorized', true)
				.set('inProcess', false)
				.set('authToken', payload.token)

		case LOG_IN_FAIL:
			return state
				.set('inProcess', false)
		
		case LOG_OUT_START:
			return state.set('inProcess', true);
		case LOG_OUT_SUCCESS:
			return state
				.set('isAuthorized', false)
				.set('inProcess', false)
				.set('authToken', false)
			
		case SIGN_UP_START:
			return state.set('inProcess', true);
		case SIGN_UP_SUCCESS:
			return state
				.set('inProcess', false);
		case SIGN_UP_FAIL:
			return state
				.set('inProcess', false)
	}
	
	return state;
}

/* Sagas */

export function* signUpSaga({ payload }) {
	yield put({ type: SIGN_UP_START })
	
	try {
		const response = yield call(api.signUp, payload)
		
		yield put({
			type: SIGN_UP_SUCCESS,
			payload: response.data
		});
		
		yield put(push('/'))
	} catch (err) {
		yield put({
			type: SIGN_UP_FAIL,
			payload: {
				error: (err.response && err.response.data) ? err.response.data.code : ''
			}
		});
	}
	
}

export function* logInSaga({ payload }) {
	yield put({ type: LOG_IN_START });
	
	try {
		const response = yield call(api.logIn, payload);

		yield put({
			type: LOG_IN_SUCCESS,
			payload: {
				token: response.data.token,
				userProfile: response.data.user
			}
		});
		
		localStorage.setItem('authToken', `${response.data.tokenPrefix}${response.data.token}`);

	} catch (err) {
		yield put({
			type: LOG_IN_FAIL,
			payload: {
				error: (err.response && err.response.data) ? err.response.data.code : ''
			}
		});
	}
}

export function* logOutSaga() {
	yield put({
		type: LOG_OUT_START
	});
	
	yield put({
		type: LOG_OUT_SUCCESS
	});
	
	localStorage.removeItem('authToken');
	
}

export function* saga() {
	yield all([
		takeEvery(SIGN_UP_REQUEST, signUpSaga),
		takeEvery(LOG_IN_REQUEST, logInSaga),
		takeEvery(LOG_OUT_REQUEST, logOutSaga)
	])
}
