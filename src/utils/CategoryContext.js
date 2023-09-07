import React, { createContext, useState, useEffect } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const storedCategoryInfo = localStorage.getItem("CategoryInfo");
    if (storedCategoryInfo) {
      setCategories(JSON.parse(storedCategoryInfo));
    }
  }, []);

  const updateCategoryItems = (newCategoryItems) => {
    setCategories(newCategoryItems);
    if (newCategoryItems) {
      localStorage.setItem("CategoryInfo", JSON.stringify(newCategoryItems));
    } else {
      localStorage.removeItem("CategoryInfo");
    }
  };

  const getCategoryById = (categoryId) => {
    const storedCategoryInfo = localStorage.getItem("CategoryInfo");
    const catSelected = JSON.parse(storedCategoryInfo);
    const category = catSelected.find((cat) => cat.id === categoryId);
    return category;
  };

  return (
    <CategoryContext.Provider
      value={{ categories, updateCategoryItems, getCategoryById }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
