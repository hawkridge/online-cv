import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'

import authReducer, { moduleName as authModule } from '../ducks/auth'
import userReducer, { moduleName as userModule } from '../ducks/user'

const rootReducer = combineReducers({
	router: connectRouter(history),
	[authModule]: authReducer,
	[userModule]: userReducer
});

export default rootReducer
