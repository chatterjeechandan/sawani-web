import { postData, fetchData, deleteData } from "./apiClient";

export function getCusertomerDetails(Id) {
  return fetchData(`customer/${Id}`);
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
