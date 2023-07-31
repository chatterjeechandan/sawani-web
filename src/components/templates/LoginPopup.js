import React, { useState, useContext } from 'react';
import '../../assets/css/forms.css';
import { login } from '../../api/auth';
import Loader from '../common/Loader/Loader';
import Toaster from '../common/Toaster/Toaster';
import login1 from "../../assets/images/loginG.png";
import login2 from "../../assets/images/loginApple.png";
import login3 from "../../assets/images/loginPhone.png";
import { AuthContext } from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../utils/CartContext';
import { getActiveCart, updateCartOwnerToCartAPI } from '../../api/cart';

const LoginPopup = ({ onClose, onOpenSignup, onOpenForgotPassword }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginFormState, setLoginFormState] = useState(false);
    const [toaster, setToaster] = useState(null);
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login: setLoginResponse } = useContext(AuthContext);
    const { cartItems, updateCartItems } = useContext(CartContext);

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
                updateCart();
            } else {
                setIsLoading(false);
                setToaster({ type: 'error', message: response.Message, duration: 3000 });
            }
        } catch (error) {
            setIsLoading(false);
            setToaster({ type: 'error', message: 'Login failed', duration: 3000 });
        }
    };

    const updateCart = async () => {
        try {
            const response = await getActiveCart();
            if (response.succeeded) {
                const loggedInCartItems = response.data.items;
                if (cartItems) {
                    const guestCartItems = cartItems.items;
                    const mergedItems = [];
                    loggedInCartItems.forEach((loggedInItem) => {
                        const guestItemIndex = guestCartItems.findIndex(
                            (guestItem) => guestItem.productVariantId === loggedInItem.productVariantId
                        );
                        if (guestItemIndex !== -1) {
                            loggedInItem.quantity += guestCartItems[guestItemIndex].quantity;
                            mergedItems.push(loggedInItem);
                            guestCartItems.splice(guestItemIndex, 1);
                        } else {
                            mergedItems.push(loggedInItem);
                        }
                    });
                    mergedItems.push(...guestCartItems);
                    const mergedCart = { ...response.data, items: mergedItems };
                    updateCartItems(mergedCart);
                } else {
                    updateCartItems(response.data);
                }

                try {
                    const response_new = await updateCartOwnerToCartAPI(response.data.id);
                    if (response_new.succeeded) {
                        setIsLoading(false);
                        setToaster({ type: 'success', message: 'Login successful', duration: 3000 });
                        setTimeout(() => {
                            onClose();
                        }, 500);
                    }
                } catch (error) {
                    console.error('Error updating cart owner:', error);
                }
            } else {
                if (cartItems) {
                    try {
                        const response = await updateCartOwnerToCartAPI(cartItems.id);
                        if (response.succeeded) {
                            setIsLoading(false);
                            setToaster({ type: 'success', message: 'Login successful', duration: 3000 });
                            setTimeout(() => {
                                onClose();
                            }, 500);
                        }
                    } catch (error) {
                        console.error('Error updating cart owner:', error);
                    }
                } else {
                    setIsLoading(false);
                    setToaster({ type: 'success', message: 'Login successful', duration: 3000 });
                    setTimeout(() => {
                        onClose();
                    }, 500);
                }
            }
        } catch (error) {
            console.error('Error login into account:', error);
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
                                {isLoading ? <Loader showOverlay={false} size={12} color="#ffffff" isLoading={true} /> : 'Log in'}
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
                        <p style={{ marginTop: "18px" }} className='joinNow'>You don’t have an account? <Link to="/signup" onClick={(e) => handleOpenSignup(e)}><b>Join now</b></Link></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;
