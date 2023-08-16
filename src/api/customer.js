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

export function updateAvatar(payload) {
  return updateData(`customer/avatar_base46`, payload);
}

export function getAllCustomerAddress() {
  return fetchData(`customer/addresses`);
}

export function addCustomerAddress(payload) {
  return postData(`customer/addresses`, payload);
}

export function deleteCustomerAddress(Id) {
  return deleteData(`customer/addresses/${Id}`);
}

export function updateAddress(Id, payload) {
  return updateData(`customer/addresses/${Id}`, payload);
}

export function checkAnonymousUserMob(mob) {
  return fetchData(`customer/check_exist/${mob}`);
}

export function createAnonymousUser(payload) {
  return postData(`customer/anonymous`, payload);
}