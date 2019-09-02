import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'

import authReducer, { moduleName as authModule } from '../ducks/auth'
import userReducer, { moduleName as userModule } from '../ducks/user'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
	router: connectRouter(history),
	toastr: toastrReducer,
	[authModule]: authReducer,
	[userModule]: userReducer
});

export default rootReducer
