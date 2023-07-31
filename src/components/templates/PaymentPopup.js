import React, { useState } from 'react';
import '../../assets/css/forms.css';
import Toaster from '../common/Toaster/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PaymentPopup = ({ onClose }) => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [toaster, setToaster] = useState(null);

    // Generate an array of years for the dropdown
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

    const handlePaymentSubmit = async () => {
        // Add your payment submit logic here
    };

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
                    <form onSubmit={handlePaymentSubmit}>
                        <input
                            className="inputBox"
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Cardholder Name"
                        />
                        <input
                            className="inputBox"
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                        />
                        <div className="expiryCvcContainer">
                            <input
                                className="inputBox expiryInput"
                                type="text"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                placeholder="MM"
                            />

                            <select
                                className="expiryInput"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                            >
                                <option value="">YY</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <input
                                className="inputBox cvcInput"
                                type="text"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="CVC"
                            />
                        </div>
                        <button className='submitpopup' type="submit">
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { PaymentPopup };
