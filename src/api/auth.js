import { postData, fetchData } from './apiClient';

export function login(credentials) {
    return postData('customer/token', credentials);
}

export function register(userData) {
    return postData('customer', userData);
}

export function forgotpassword(userData) {
    return postData('customer/forgot_password', userData);
}

export function resetPassword(userData) {
    return postData('customer/reset_password', userData);
}
