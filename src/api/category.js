import { fetchData } from './apiClient';

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await fetchData('/catalog/categories');
        return response;
    } catch (error) {
        throw new Error('Failed to fetch categories.');
    }
};


