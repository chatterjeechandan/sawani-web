import { fetchData } from './apiClient';

export function getDeliveryMethodAPI() {
    return fetchData(`lookups/delivery_types`);
}

export function getPaymentMethodAPI() {
    return fetchData(`lookups/payment_methods`);
}

export function getOnePayMethodAPI() {
    return fetchData(`lookups/one_pay_methods`);
}
