import { fetchData } from './apiClient';

export function fetchProductsbyCat(storeId, scatId, sort) {
    let apiUrl = `catalog/products?store_Id=${storeId}&cat_Id=${scatId}`;
    if (sort) {
        apiUrl += `&sort=${sort}`;
    }
    return fetchData(apiUrl);
}

export function getProductById(productId) {
    return fetchData(`catalog/products/${productId}`);
}

export function getRelatedProducts(variantId) {
    return fetchData(`catalog/related_products/${variantId}`);
}
