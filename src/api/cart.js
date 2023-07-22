import { fetchData, postData, updateData, deleteData } from './apiClient';

export function getActiveCart() {
    return fetchData(`cart/active_user`);
}

export function getCartAPI(cartId) {
    return fetchData(`cart/${cartId}`);
}

export function createCartAPI(cartData) {
    return postData('cart', cartData);
}

export function updateCartAPI(cartId, updatedItem) {
    return updateData(`cart/${cartId}/update_item`, updatedItem);
}

export function addCartAPI(cartId, newCartItem) {
    return updateData(`cart/${cartId}/add_item`, newCartItem);
}

export function deleteCartAPI(cartId, newCartItem) {
    return deleteData(`cart/${cartId}/delete_item`, newCartItem);
}

