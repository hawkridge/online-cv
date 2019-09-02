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

	getProfileBtn = () => {
		return <Link to={`/user/profile`}>Profile</Link>
	};
	
	render() {
		const { isAuthorized } = this.props;

		return (
			<header className='Top-menu'>
				<div style={{display: 'flex', background: 'lightgray'}} >
					<div>
						<Link to={'/'}>Main</Link> &nbsp;

						{
							isAuthorized ? this.getLogOutBtn() : this.getSignInBtn()
						}
					</div>

					<div>
						{
							isAuthorized ? this.getProfileBtn() : null
						}
					</div>
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
