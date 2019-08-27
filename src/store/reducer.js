import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'

import authReducer, { moduleName as authModule } from '../ducks/auth'

const rootReducer = combineReducers({
	router: connectRouter(history),
	[authModule]: authReducer
});

export default rootReducer
