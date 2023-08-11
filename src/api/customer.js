import { postData, fetchData, deleteData, updateData, fetchSessionData } from "./apiClient";

export function getCusertomerDetails(Id) {
  return fetchData(`customer/${Id}`);
}

export function getSessionCusertomerDetails(token) {
  return fetchSessionData(`customer/me`, token);
}

export function getCusertomerFavourite() {
  return fetchData(`customer/favorites`);
}

export function createCustomerFavourite(Id) {
  return postData(`customer/favorites?productVariantId=${Id}`);
}

export function deleteCustomerFavourite(Id) {
  return deleteData(`customer/favorites/${Id}`);
}

export function updateProfile(payload) {
  return updateData(`customer/edit_profile`, payload);
}