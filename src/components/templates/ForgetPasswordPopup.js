import React, { useState, useEffect } from 'react';
import '../../assets/css/forms.css';
import { forgotpassword, resetPassword } from '../../api/auth';
import Loader from '../common/Loader/Loader';
import Toaster from '../common/Toaster/Toaster';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const ForgetPasswordPopup = ({ onClose, onOpenLogin }) => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toaster, setToaster] = useState(null);
    const [mobileError, setMobileError] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmpassError, setConfirmpassError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const mobileFormat = /^9665\d{8}$/;

        if (!mobile) {
            setMobileError('Please enter mobile number');
            return;
        }

        if (!mobile.match(mobileFormat)) {
            setMobileError('Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await forgotpassword({ mobile });
            console.log('Forgot Password response:', response);
            if (response.message) {
                setIsLoading(false);
                setToaster({ type: 'success', message: response.message, duration: 3000 });
                setShowResetForm(true);
            }
            else {
                setIsLoading(false);
                setToaster({ type: 'error', message: response.Message, duration: 3000 });
            }

        } catch (error) {
            setIsLoading(false);
            setToaster({ type: 'error', message: 'Forgot Password failed', duration: 3000 });
        }
    };


    useEffect(() => {

        const strongPasswordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (password) {
            setPasswordError('');
        }

        if (strongPasswordFormat.test(password)) {
            setPasswordError('');
        }

        if (confirmPassword) {
            setConfirmpassError('');
        }

        if (password == confirmPassword) {
            setConfirmpassError('');
        }
        
    }, [password,confirmPassword]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const strongPasswordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!otp) {
            setOtpError('Please enter otp');
            return;
        }

        if (!password) {
            setPasswordError('Please enter password');
            return;
        }

        if (!strongPasswordFormat.test(password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character');
            return;
        }

        if (!confirmPassword) {
            setConfirmpassError('Please enter confirm password');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmpassError('Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            const response = await resetPassword({ mobile, otp, password });
            console.log('Reset Password response:', response);
            if (response.message) {
                setIsLoading(false);
                setToaster({ type: 'success', message: response.message, duration: 3000 });
                setTimeout(() => {
                    onClose();
                }, 500);
            }
            else {
                setIsLoading(false);
                if (response.errors) {
                    Object.values(response.errors).forEach((errorArray) => {
                        errorArray.forEach((errorMessage) => {
                            setToaster({ type: 'error', message: errorMessage, duration: 3000 });
                        });
                    });
                } else {
                    setToaster({ type: 'error', message: 'Signup failed. Please try again.', duration: 3000 });
                }
            }

        } catch (error) {
            setIsLoading(false);
            setToaster({ type: 'error', message: 'Password reset failed', duration: 3000 });
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

    const handleOpenLogin = (e) => {
        e.preventDefault();
        onClose();
        onOpenLogin();
    };

    const handleToggleResetForm = () => {
        setShowResetForm(!showResetForm);
    };

    if (!showResetForm) {
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
                    <h2>Forgot Password</h2>
                    <button className="closeBtn" type="button" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="loginFormWraper">
                        <form onSubmit={handleForgotPassword}>
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
                            <button className="submitpopup" type="submit">
                                {isLoading ? <Loader showOverlay={false} size={12} color="#ffffff" isLoading={true} /> : 'Forgot Password'}
                            </button>
                            <p className="joinNow">
                                You already have an account?{' '}
                                <Link to="/login" onClick={(e) => handleOpenLogin(e)}>
                                    <b>Login now</b>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

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
                <h2>Reset Password</h2>
                <button className="closeBtn" type="button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="loginFormWraper">
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number</label>
                            <div className="mobileContainer">
                                <span>{mobile}</span>
                                <button className="editBtn" type="button" onClick={() => handleToggleResetForm()}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </div>
                        </div>
                        <input
                            type="text"
                            id="otp"
                            className={`inputBox ${toaster && toaster.type === 'error' ? 'inputError' : ''}`}
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {otpError && <span className="errorText">{otpError}</span>}
                        <input
                            type="password"
                            id="password"
                            className={`inputBox ${toaster && toaster.type === 'error' ? 'inputError' : ''}`}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <span className="errorText">{passwordError}</span>}
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`inputBox ${toaster && toaster.type === 'error' ? 'inputError' : ''}`}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmpassError && <span className="errorText">{confirmpassError}</span>}
                        <button className="submitpopup" type="submit">
                            {isLoading ? <Loader showOverlay={false} size={12} color="#ffffff" isLoading={true} /> : 'Reset Password'}
                        </button>
                        <p className="joinNow">
                            You already have an account?{' '}
                            <Link to="/login" onClick={(e) => handleOpenLogin(e)}>
                                <b>Login now</b>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPopup;
