import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authStateSelector } from '../ducks/auth'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
	render() {
		const { isAuthorized, Component, path } = this.props;
		
		return (
			<Route path={path} render={ () => {
				return isAuthorized ?
					( <Component /> ) :
					( <Redirect to={'/'}/> )
			} }/>
		);
	}
}

ProtectedRoute.propTypes = {
	isAuthorized: PropTypes.any.isRequired,
	Component: PropTypes.elementType.isRequired
};

const mapStateToProps = state => ({
	isAuthorized: authStateSelector(state)
})

export default connect(
	mapStateToProps,
	{}
)(ProtectedRoute);
