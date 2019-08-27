import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import TopMenu from "./components/top-menu/TopMenu"
import LoginPage from "./routes/LoginPage"
import RegistrationPage from "./routes/RegistrationPage"
import ProtectedRoute from "./routes/ProtectedRoute"
import UserPage from "./routes/UserPage"

class Root extends Component {
	render() {
		return (
			<div>
				<section>
					<header>
						<TopMenu />
					</header>
				</section>
				<Switch>
					<Route exact path={'/'} component={ LoginPage }/>
					<Route path={'/registration'} component={ RegistrationPage } />
					<ProtectedRoute path={'/user'} Component={ UserPage }/>
					<Route render={() => <div>404 not found</div>} />
				</Switch>
			</div>
		)
	}
}

export default Root;
