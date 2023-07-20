import { fetchData } from './apiClient';

export const fetchProductsbyCat = async (storeId, scatId, sort) => {
    try {
        let apiUrl = `catalog/products?store_Id=${storeId}&cat_Id=${scatId}`;
        if (sort) {
            apiUrl += `&sort=${sort}`;
        }
        const response = await fetchData(apiUrl);
        return response;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
};


export const getProductById = async (productId) => {
    try {
        const response = await fetchData(`catalog/products/${productId}`);
        return response;
    } catch (error) {
        throw new Error('Failed to fetch product.');
    }
};


