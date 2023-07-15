import React, { useState } from 'react';
import './LoginPopup.css';
import { login } from '../../../api/auth';
import Loader from '../../common/Loader/Loader';
import Toaster from '../../../components/common/Toaster/Toaster';

const LoginPopup = ({ onClose }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toaster, setToaster] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await login({ mobile, password });
            console.log('Login response:', response);
            if (response.id) {
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
                <h2>Login</h2>
                <button type="button" onClick={onClose}>
                    Close
                </button>
                <form onSubmit={handleLogin}>
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

export default LoginPopup;
