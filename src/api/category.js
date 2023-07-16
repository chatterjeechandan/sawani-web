import { fetchData } from './apiClient';

export const fetchCategories = async () => {
    try {
        const response = await fetchData('catalog/nested_categories');
        return response;
    } catch (error) {
        throw new Error('Failed to fetch categories.');
    }
};


