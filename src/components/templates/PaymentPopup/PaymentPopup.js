import React, { useState, useEffect } from 'react';
import './PaymentPopup.css';
import Toaster from '../../common/Toaster/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TapPaymentForm from './TapPaymentForm';
import { GoSell } from "@tap-payments/gosell";
import GoSellDemo from './GoSellDemo';


const PaymentPopup = ({ onClose }) => {
    const [toaster, setToaster] = useState(null); 

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToasterClose = () => {
        setToaster(null);
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            {toaster && (
                <Toaster
                    type={toaster.type}
                    message={toaster.message}
                    duration={toaster.duration}
                    onClose={handleToasterClose}
                />
            )}
            <div className="popup-content">
                <h2>Please fill your card information</h2>
                <button className='closeBtn' type="button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='loginFormWraper'>
                <button onClick={() => GoSell.openLightBox()}>
                  open goSell LightBox
                </button>
                <button onClick={() => GoSell.openPaymentPage()}>
                  open goSell Page
                </button>
                    <GoSellDemo/>
                </div>
            </div>
        </div>
    );
};

export { PaymentPopup };
