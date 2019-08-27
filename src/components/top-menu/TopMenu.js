import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authStateSelector, logOut } from '../../ducks/auth'
import { Link } from 'react-router-dom'

class TopMenu extends Component {
	
	handleClick = ev => {
		const { logOut } = this.props;
		logOut()
	};
	
	getLogOutBtn = () => {
		return <input type="button"  value='Log out' onClick={this.handleClick} />
	};
	
	getSignInBtn = () => {
		return <Link to={'/registration'} className='test-class' >Sign up</Link>
	};
	
	render() {
		const { isAuthorized } = this.props;
		console.log('isAuthorized', isAuthorized);
		return (
			<header className='Top-menu'>
				<div style={{background: 'lightgray'}}>
					<Link to={'/'}>Main</Link> &nbsp;
					
					{
						isAuthorized ? this.getLogOutBtn() : this.getSignInBtn()
					}
				</div>
			</header>
		);
	}
}

TopMenu.propTypes = {};

const mapStateToProps = state => ({
	isAuthorized: authStateSelector(state)
})

export default connect(
	mapStateToProps,
	{
		logOut
	}
)(TopMenu);