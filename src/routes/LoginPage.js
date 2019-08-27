import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logIn, authStateSelector, apiErrorSelector } from '../ducks/auth'
import LogInForm from '../components/forms/log-in/LogInForm'

class LoginPage extends Component {
	
	render() {
		const { isAuthorized, logIn, apiCallError } = this.props;
		
		if(isAuthorized) return <Redirect to={'/user'} />;
		
		return (
			<>
				<LogInForm error={ apiCallError } logIn={ logIn } />
			</>
		);
	}
}

LoginPage.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
	apiCallError: PropTypes.object
};

const mapStateToProps = state => ({
	isAuthorized: authStateSelector(state),
	apiCallError: apiErrorSelector(state)
});

export default connect(
	mapStateToProps,
	{
		logIn
	}
)(LoginPage);
