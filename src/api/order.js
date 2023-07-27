import { fetchData, updateData } from './apiClient';

export function cartToOrder(cartId) {
    let apiUrl = `order/cart_to_order`;
    if (cartId) {
        apiUrl += `/${cartId}`;
    }
    return fetchData(apiUrl);
}

export function updatedeliveryMethod(orderId, updatedItem) {
    return updateData(`order/${orderId}/update_delivery_method`, updatedItem);
}

export function updatePaymentMethod(orderId, updatedItem) {
    return updateData(`order/${orderId}/payment_method`, updatedItem);
}
