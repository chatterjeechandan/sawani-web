import { fetchData } from './apiClient';

export const fetchProductsbyCat = async (storeId, scatId) => {
    try {
        const response = await fetchData(`catalog/products?store_Id=${storeId}&cat_Id=${scatId}`);
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


