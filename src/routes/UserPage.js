import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class UserPage extends Component {
	
	render() {
		return (
			<div>
				You are welcome! This is your awesome page!
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
