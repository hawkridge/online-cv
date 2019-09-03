import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authStateSelector, logOut } from '../../ducks/auth'
import { Link } from 'react-router-dom'
import LangSwitcher from '../langSwitcher/LangSwitcher'
import { withTranslation } from 'react-i18next'

class TopMenu extends Component {
	
	handleClick = ev => {
		const { logOut } = this.props;
		logOut()
	};
	
	getLogOutBtn = (t) => {
		return <input type="button"  value={ t('topMenu.buttons.logout') } onClick={this.handleClick} />
	};
	
	getSignInBtn = (t) => {
		return <Link to={'/registration'} className='test-class' >{ t('topMenu.buttons.signup') }</Link>
	};

	getProfileBtn = (t) => {
		return <Link to={`/user/profile`}>{ t('topMenu.buttons.profile') }</Link>
	};
	
	render() {
		const { isAuthorized, t } = this.props;

		return (
			<header className='Top-menu'>
				<div style={{display: 'flex', background: 'lightgray'}} >
					<div>
						<LangSwitcher />
					</div>
					<div>
						<Link to={'/'}>{ t('topMenu.buttons.main') }</Link> &nbsp;

						{
							isAuthorized ? this.getLogOutBtn(t) : this.getSignInBtn(t)
						}
					</div>

					<div>
						{
							isAuthorized ? this.getProfileBtn(t) : null
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
)(withTranslation(['ns1'])(TopMenu));
