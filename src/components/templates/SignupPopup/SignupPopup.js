import React, { useState } from 'react';
import './SignupPopup.css';
import { register } from '../../../api/auth';
import Loader from '../../common/Loader/Loader';
import Toaster from '../../common/Toaster/Toaster';

const SignUpPopup = ({ onClose }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toaster, setToaster] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
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
                setToaster({ type: 'error', message: 'Signup failed', duration: 3000 });
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
                X
                </button>
                <div className='loginFormWraper'>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        className='inputBox'
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        className='inputBox'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <span className='passwordWraper signupPasswordWraper'>
                    <input
                        type="password"
                        placeholder="Password"
                        className='inputBox'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </span>
                    <button className='submitpopup' type="submit">Sign up</button>
                    <p className='joinNow'>You already have an account? <b>Login now</b></p>
                </form>
                </div>
            </div>
            {isLoading ? <Loader showOverlay={isLoading} /> : ''}
        </div>
    );
};

export default SignUpPopup;
