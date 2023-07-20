import React, { useState, useContext } from 'react';
import '../../assets/css/forms.css';
import { login } from '../../api/auth';
import Loader from '../common/Loader/Loader';
import Toaster from '../common/Toaster/Toaster';
import l1 from "../../assets/images/l1.png";
import l2 from "../../assets/images/l2.png";
import l3 from "../../assets/images/l3.png";
import login1 from "../../assets/images/loginG.png";
import login2 from "../../assets/images/loginApple.png";
import login3 from "../../assets/images/loginPhone.png";
import { AuthContext } from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const LoginPopup = ({ onClose, onOpenSignup, onOpenForgotPassword }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginFormState, setLoginFormState] = useState(false);
    const [toaster, setToaster] = useState(null);
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login: setLoginResponse } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const mobileFormat = /^[0-9]{10}$/;

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
            const response = await login({ mobile, password });
            console.log('Login response:', response);
            if (response.id) {
                localStorage.setItem('loginInfo', JSON.stringify(response));
                setLoginResponse(response);
                setToaster({ type: 'success', message: 'Login successful', duration: 3000 });
                setTimeout(() => {
                    onClose();
                }, 500);
            } else {
                setIsLoading(false);
                setToaster({ type: 'error', message: response.Message, duration: 3000 });
            }
        } catch (error) {
            setIsLoading(false);
            setToaster({ type: 'error', message: 'Login failed', duration: 3000 });
        }
    };

    const toggleLoginFormFn = () => {
        setLoginFormState(!loginFormState);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToasterClose = () => {
        setToaster(null);
    };

    const handleOpenSignup = (e) => {
        e.preventDefault();
        onClose();
        onOpenSignup();
    };


    const handleOpenForgotPassword = (e) => {
        e.preventDefault();
        onClose();
        onOpenForgotPassword();
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
                {loginFormState ? (
                    <h2>Login</h2>
                ) : (
                    <h2>Please sign in or up to continue</h2>
                )}
                <button className='closeBtn' type="button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {loginFormState ? (
                    <div className='loginFormWraper'>
                        <form onSubmit={handleLogin}>
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
                            <span className='passwordWraper'>
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
                            <p className='forgotPassword'><Link to="/forgot-password" onClick={(e) => handleOpenForgotPassword(e)}>Forgot your password?</Link></p>
                            <button className='submitpopup' type="submit">
                                {isLoading ? <Loader size={24} color="#ffffff" /> : 'Log in'}
                            </button>
                            <p className='joinNow'>You don’t have an account? <Link to="/signup" onClick={(e) => handleOpenSignup(e)}><b>Join now</b></Link></p>
                        </form>
                    </div>
                ) : (
                    <div className='loginFormWraper'>
                        <div className='individualLoginOptions'>
                            {/* <span className='iconsLogin'>
                                <img src={l1} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH GOOGLE</span> */}
                            <img src={login1} className='loginImgs' alt='' />
                        </div>
                        <div className='individualLoginOptions'>
                            {/* <span className='iconsLogin'>
                                <img src={l2} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH APPLE</span> */}
                            <img src={login2} className='loginImgs' alt='' />
                        </div>
                        <div className='individualLoginOptions' onClick={toggleLoginFormFn}>
                            {/* <span className='iconsLogin'>
                                <img src={l3} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH PHONE NUMBER</span> */}
                            <img src={login3} className='loginImgs' alt='' />
                        </div>
                        <p style={{marginTop: "18px"}}className='joinNow'>You don’t have an account? <Link to="/signup" onClick={(e) => handleOpenSignup(e)}><b>Join now</b></Link></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;
