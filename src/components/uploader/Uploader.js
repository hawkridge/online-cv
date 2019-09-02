import React from 'react';
import PropTypes from 'prop-types'

const Uploader = ( props ) => {
    const {
        onChange,
        multiple = false,
        disabled = false
    } = props;

    return (
        <div className='Uploader'>
            <input type="file" onChange={ onChange } multiple={ multiple } disabled={ disabled } />
        </div>
    );
};

Uploader.propTypes = {
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool
}

export default Uploader;