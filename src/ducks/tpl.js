// import { appName } from '../config'
// import { createSelector } from 'reselect'
// import { takeEvery, call, put, all } from 'redux-saga/effects'
// import { Record } from 'immutable'
//
// /* Constants */
//
// export const moduleName = 'tpl';
// const prefix = `${appName}/${moduleName}`;
//
// /* Action creators */
//
// export const ac = () => ({
// 	type: 'TEST_REQUEST',
// 	payload: {}
// });
//
// /* Selectors */
//
// export const selector = state => state[moduleName];
// export const testSelector = createSelector(
// 	selector,
// 	state => state.test
// )
//
//
// /* Reducer */
//
// const initialState = Record({
// 	test: true
// });
//
// export default function reducer(state = initialState(), action) {
// 	const { type, payload } = action;
//
// 	switch(type) {
// 		default:
// 			return state
// 	}
// }
//
// /* Sagas */
//
// export function* testSaga() {
// 	yield put({ type: 'TEST_START' })
// }
//
// export function* saga() {
// 	yield all([
// 		takeEvery('TEST_REQUEST', testSaga)
// 	])
// }
