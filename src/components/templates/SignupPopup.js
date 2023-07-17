import React, { useState } from 'react';
import '../../assets/css/forms.css';
import { register } from '../../api/auth';
import Loader from '../common/Loader/Loader';
import Toaster from '../common/Toaster/Toaster';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SignUpPopup = ({ onClose, onOpenLogin }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toaster, setToaster] = useState(null);
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        const mobileFormat = /^[0-9]{10}$/;

        if (!name) {
            setNameError('Please enter your name');
            return;
        }

        if (!mobile) {
            setMobileError('Please enter mobile number');
            return;
        }

        if (!mobile.match(mobileFormat)) {
            setMobileError('Invalid mobile number format');
            return;
        }

        if (!password) {
            setPasswordError('Please enter password');
            return;
        }

        try {
            setIsLoading(true);
            const response = await register({ name, mobile, password });
            console.log('Signup response:', response);
            if (response.id) {
                setToaster({ type: 'success', message: 'Signup successful', duration: 3000 });
                setTimeout(() => {
                    onClose();
                }, 500);
            } else {
                setIsLoading(false);
                setToaster({ type: 'error', message: response.Message, duration: 3000 });
            }
        } catch (error) {
            setIsLoading(false);
            setToaster({ type: 'error', message: 'Signup failed', duration: 3000 });
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToasterClose = () => {
        setToaster(null);
    };

    const handleOpenSignin = (e) => {
        e.preventDefault();
        onClose();
        onOpenLogin();
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
                <h2>Sign Up</h2>
                <button className='closeBtn' type="button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='loginFormWraper'>
                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            className={`inputBox ${nameError ? 'inputError' : ''}`}
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError('');
                            }}
                        />
                        {nameError && <span className="errorText">{nameError}</span>}
                        <input
                            type="text"
                            className={`inputBox ${mobileError ? 'inputError' : ''}`}
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                                setMobileError('');
                            }}
                        />
                        {mobileError && <span className="errorText">{mobileError}</span>}
                        <span className='passwordWraper signupPasswordWraper'>
                            <input
                                type="password"
                                className={`inputBox ${passwordError ? 'inputError' : ''}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                            />
                        </span>
                        {passwordError && <span className="errorText">{passwordError}</span>}
                        <button className='submitpopup' type="submit">
                            {isLoading ? <Loader size={24} color="#ffffff" /> : 'Sign up'}
                        </button>
                        <p className='joinNow'>You already have an account? <Link to="/login" onClick={(e) => handleOpenSignin(e)}><b>Login now</b></Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPopup;