import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { login } from '../../../api/auth';
import Loader from '../../common/Loader/Loader';
import Toaster from '../../../components/common/Toaster/Toaster';
import l1 from "../../../assets/images/l1.png";
import l2 from "../../../assets/images/l2.png";
import l3 from "../../../assets/images/l3.png";
import { AuthContext } from '../../../utils/AuthContext';

const LoginPopup = ({ onClose }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginFormState, setLoginFormState] = useState(false);
    const [toaster, setToaster] = useState(null);

    const { login: setLoginResponse } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
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
                setToaster({ type: 'error', message: 'Login failed', duration: 3000 });
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
                    X
                </button>
                {loginFormState ? (
                    <div className='loginFormWraper'>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                className='inputBox'
                                placeholder="Mobile Number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            <span className='passwordWraper'>
                            <input
                                type="password"
                                className='inputBox'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </span>
                            <p className='forgotPassword'>Forgot your password?</p>
                            <button className='submitpopup' type="submit">Log in</button>
                            <p className='joinNow'>You don’t have an account? <b>Join now</b></p>
                        </form>
                    </div>
                ) : (
                    <div className='loginFormWraper'>
                        <div className='individualLoginOptions'>
                            <span className='iconsLogin'>
                                <img src={l1} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH GOOGLE</span>
                        </div>
                        <div className='individualLoginOptions'>
                            <span className='iconsLogin'>
                                <img src={l2} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH APPLE</span>
                        </div>
                        <div className='individualLoginOptions' onClick={toggleLoginFormFn}>
                            <span className='iconsLogin'>
                                <img src={l3} alt='' />
                            </span>
                            <span className='loginInfoDetails'>CONTINUE WITH PHONE NUMBER</span>
                        </div>
                    </div>
                )}
                
            </div>
            {isLoading ? <Loader showOverlay={isLoading} /> : ''}
        </div>
    );
};

export default LoginPopup;
