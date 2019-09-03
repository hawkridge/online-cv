import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logIn, authStateSelector } from '../ducks/auth'
import LogInForm from '../components/forms/log-in/LogInForm'


class LoginPage extends Component {

	render() {
		const { isAuthorized, logIn } = this.props;
		
		if ( isAuthorized ) return <Redirect to={'/user'} />;
		
		return (
			<>
				<LogInForm logIn={ logIn } />
			</>
		);
	}
}

LoginPage.propTypes = {
	isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthorized: authStateSelector(state)
});

export default connect(
	mapStateToProps,
	{
		logIn
	}
)(LoginPage);
