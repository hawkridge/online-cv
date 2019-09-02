import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Profile from '../components/profile/Profile'

class UserPage extends Component {
	
	render() {
		return (
			<div>
				You are welcome! This is your awesome page!

				<Route path={`/user/profile`} component={ Profile }/>
			</div>
		);
	}
}

UserPage.propTypes = {};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null
)(UserPage);
