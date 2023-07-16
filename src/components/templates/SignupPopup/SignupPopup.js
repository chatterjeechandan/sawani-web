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
                <button type="button" onClick={onClose}>
                    Close
                </button>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            {isLoading ? <Loader showOverlay={isLoading} /> : ''}
        </div>
    );
};

export default SignUpPopup;
