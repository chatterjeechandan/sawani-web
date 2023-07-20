import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.css';

const Loader = ({ showOverlay, color, size, isLoading }) => {
    return (
        <div className={`loader ${showOverlay ? 'overlay' : ''}`}>
            {showOverlay && <div className="loader-overlay"></div>}
            <div className="loader-content" style={{ color: color, fontSize: size }}>
                <FontAwesomeIcon icon={faSpinner} spin />
                {isLoading && <span> Loading...</span>}
            </div>
        </div>
    );
};

export default Loader; 
