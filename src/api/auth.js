import { postData } from './apiClient';

export function login(credentials) {
    return postData('/customer/token', credentials);
}

export function register(userData) {
    return postData('/register', userData);
}