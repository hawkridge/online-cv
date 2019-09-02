import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authStateSelector } from '../../ducks/auth'
import Preloader from '../preloader/Preloader'
import ProfileAvatar from '../profileAvatar/ProfileAvatar'

import {
    processStateSelector,
    userProfileSelector,
    photoUploadingStateSelector,
    getProfile,
    updateUserPhoto
} from '../../ducks/user'

class Profile extends Component {
    componentDidMount() {
        const { getProfile, userProfile } = this.props;
        if (!userProfile) getProfile();
    }

    renderProfileContent = profile => (
        <>
            <h3>User id: { profile.id }</h3>
            <div>
                <span>Email: </span>
                <span>{ profile.email || '-' }</span>
            </div>
            <div>
                <span>First name: </span>
                <span>{ profile.firstName || '-' }</span>
            </div>
            <div>
                <span>Middle name: </span>
                <span>{ profile.middleName || '-' }</span>
            </div>
            <div>
                <span>Last name: </span>
                <span>{ profile.lastName || '-' }</span>
            </div>
        </>
    )

    render() {
        const { inProcess, userProfile, updateUserPhoto, uploadingPhoto } = this.props;

        if ( inProcess ) return <Preloader />;

        return (
            <div>
                <ProfileAvatar photo={ userProfile.photo } onUpdate={ updateUserPhoto } loading={ uploadingPhoto } />
                { this.renderProfileContent( userProfile ) }
            </div>
        );
    }
}

Profile.propTypes = {
    inProcess: PropTypes.bool,
    userProfile: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    uploadingPhoto: PropTypes.bool,
    getProfile: PropTypes.func.isRequired,
    updateUserPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    inProcess: processStateSelector(state),
    userProfile: userProfileSelector(state),
    uploadingPhoto: photoUploadingStateSelector(state)
});

export default connect(
    mapStateToProps,
    {
        getProfile,
        updateUserPhoto
    }
)(Profile);