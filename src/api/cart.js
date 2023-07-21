import { postData, updateData, deleteData } from './apiClient';

export function createCartAPI(cartData) {
    return postData('cart', cartData);
}

export function updateCartAPI(cartData, updatedItem) {
    return updateData(`cart/${cartData.id}/update_item`, updatedItem);
}

export function addCartAPI(cartData, newCartItem) {
    return updateData(`cart/${cartData.id}/add_item`, newCartItem);
}

export function deleteCartAPI(cartData, newCartItem) {
    return deleteData(`cart/${cartData.id}/delete_item`, newCartItem);
}
