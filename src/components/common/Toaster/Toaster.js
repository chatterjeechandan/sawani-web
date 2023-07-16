import React, { useState, useEffect } from 'react';
import './Toaster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Toaster = ({ type, message, duration, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <div className={`toaster ${type} ${isVisible ? 'show' : 'hide'}`}>
            <div className="toaster-content">
                <div className="toaster-message">{message}</div>
                <button className="toaster-close" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};

export default Toaster;
