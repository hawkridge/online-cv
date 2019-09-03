import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignUpForm from '../components/forms/sign-up/SignUpForm'
import { signUp, authStateSelector } from '../ducks/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RegistrationPage extends Component {
	
	render() {
		const { isAuthorized, signUp } = this.props;
		
		if ( isAuthorized ) return <Redirect to={'/user'} />;
		
		return (
			<>
				<SignUpForm signUp={ signUp } />
			</>
		);
	}
}


RegistrationPage.propTypes = {
	isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthorized: authStateSelector(state)
});

export default connect(
	mapStateToProps,
	{
		signUp
	}
)(RegistrationPage);
