import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import store from "./store/store"
import { ConnectedRouter } from "connected-react-router"
import history from "./history"
import { Provider } from "react-redux"

import 'normalize.css'
import './assets/styles/index.sass'

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<Root />
		</ConnectedRouter>
	</Provider>,
document.getElementById('root'));
