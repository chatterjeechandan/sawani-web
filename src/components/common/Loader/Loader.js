import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.css';

const Loader = ({ showOverlay }) => {
    return (
        <div className={`loader ${showOverlay ? 'overlay' : ''}`}>
            {showOverlay && <div className="loader-overlay"></div>}
            <div className="loader-content">
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
