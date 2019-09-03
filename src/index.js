import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import store from "./store/store"
import { ConnectedRouter } from "connected-react-router"
import history from "./history"
import { Provider } from "react-redux"
import ReduxToastr from 'react-redux-toastr'
import { I18nextProvider } from 'react-i18next'
import i18n from './assets/i18n/i18n'

import 'normalize.css'
import './assets/styles/index.sass'

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<I18nextProvider i18n={ i18n } >
				<Root />

				<ReduxToastr
					timeOut={5000}
					newestOnTop={false}
					preventDuplicates
					position="top-right"
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
					closeOnToastrClick
				/>
			</I18nextProvider>
		</ConnectedRouter>
	</Provider>,
document.getElementById('root'));
