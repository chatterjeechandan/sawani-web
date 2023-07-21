import React, { createContext, useState, useEffect } from 'react';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const storedCategoryInfo = localStorage.getItem('CategoryInfo');
        if (storedCategoryInfo) {
            setCategories(JSON.parse(storedCategoryInfo));
        }
    }, []);

    const updateCategoryItems = (newCategoryItems) => {
        setCategories(newCategoryItems);
        if (newCategoryItems) {
            localStorage.setItem('CategoryInfo', JSON.stringify(newCategoryItems));
        }
        else {
            localStorage.removeItem('CategoryInfo');
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, updateCategoryItems }}>
            {children}
        </CategoryContext.Provider>
    );
};

export { CategoryContext, CategoryProvider };
