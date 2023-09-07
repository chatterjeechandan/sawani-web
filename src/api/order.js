import { fetchData, updateData, postData } from "./apiClient";

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

export function addPayment(orderId, paymentPayload) {
  return postData(`order/${orderId}/add_payment`, paymentPayload);
}

export function checkout(orderId) {
  return updateData(`order/${orderId}/checkout`, "");
}

export function getOrder(id) {
  return fetchData(`order/${id}`);
}

export function updateAnonymousOrder(orderId, userId) {
  return updateData(`order/${orderId}/order_anonymous_user/${userId}`);
}
