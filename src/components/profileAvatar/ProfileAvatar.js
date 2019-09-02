import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Preloader from '../preloader/Preloader'
import { originName } from '../../config'
import Uploader from '../uploader/Uploader'

class ProfileAvatar extends Component {

    state = {
        photo: false,
        files: false
    }

    renderPhoto = photo => {
        const photoUri = this.state.photo ? this.state.photo : photo ? `${ originName }/img/${ photo.uri }` : false;
        return (
            <div style={{width: '150px', height: '150px', border: '1px solid #000000'}}>
                <img style={{width: '100%', height: '100%'}} src={ photoUri || 'http://placehold.it/180'} alt="avatar"/>
            </div>
        )
    }

    handleChange = ev => {
        const { files } = ev.target;
        const url = URL.createObjectURL(files[0])

        this.setState({
            photo: url,
            files: files
        })
    };

    updateUserPhoto = () => {
        const { onUpdate, loading } = this.props;
        if ( loading ) return;

        const formData = new FormData();
        const file = this.state.files[0];

        formData.append('file', file);
        onUpdate(formData)
    };

    getSubmitBtn = (loading) => (
        <button
            disabled={ !this.state.files || loading }
            onClick={ this.updateUserPhoto } >
            {
                loading ? 'Loading' : 'Change photo'
            }
        </button>
    )

    render() {
        const { photo, loading } = this.props;
        return (
            <div>
                <div className="Avatar">
                    {
                        this.renderPhoto( photo )
                    }
                </div>
                <div>
                    <Uploader onChange={ this.handleChange } disabled={ loading } />
                    {
                        this.getSubmitBtn(loading)
                    }
                </div>
            </div>
        );
    }
}

ProfileAvatar.propTypes = {};

export default ProfileAvatar;