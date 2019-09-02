import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import store from "./store/store"
import { ConnectedRouter } from "connected-react-router"
import history from "./history"
import { Provider } from "react-redux"
import ReduxToastr from 'react-redux-toastr'

import 'normalize.css'
import './assets/styles/index.sass'

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<Root />
		</ConnectedRouter>

		<ReduxToastr
			timeOut={5000}
			newestOnTop={false}
			preventDuplicates
			position="top-right"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
			closeOnToastrClick />
	</Provider>,
document.getElementById('root'));
