import React, { useEffect, useState, useContext, useRef } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchProductsbyCat } from "../api/product";
import Loader from "../components/common/Loader/Loader";
import ProductCard from "../components/product/ProductCard";
import { ProductFilter } from "../components/product/ProductFilter";
import { CategoryContext } from "../utils/CategoryContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { fetchCategories } from "../api/category";

const ProductList = () => {
  const { pcat } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { categories, updateCategoryItems } = useContext(CategoryContext);
  const sort = searchParams.get("sort");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const { t } = useTranslation();

  useEffect(() => {
    if (isInitialMount) {
      window.scrollTo(0, 0);
      setIsInitialMount(false);
    }

    fetchProducts();
    // If you still want to ignore lint warnings, add the line below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcat, sort, i18next.language]);

  useEffect(() => {
    updateCategoryContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18next.language]);

  useEffect(() => {
    selectCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const updateCategoryContext = async () => {
    const response = await fetchCategories();
    updateCategoryItems(response);
  };

  const selectCategory = () => {
    if (!categories) {
      return;
    }
    const number = pcat.split("&")[0];
    const selectedCategory = categories.find(
      (category) => Number(category.id) === Number(number)
    );
    console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setProducts([]);
    try {
      const response = await fetchProductsbyCat(1, pcat, sort);
      setProducts(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    const url = `/products/${category.id}`;
    navigate(url);
    setSelectedCategory(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShortSelectChange = (selectedValue) => {
    const url = `/products/${pcat}&sort=${selectedValue}`;
    navigate(url);
  };

  const headerRef = useRef(null);

  const openCartPopup = () => {
    if (headerRef.current && headerRef.current.openCartPopup) {
      headerRef.current.openCartPopup();
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="dashboardPageMaimWraper">
      <Header ref={headerRef} />
      <div className="productPageWraper">
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          setSelectedCategory={setSelectedCategory}
          onShortSelectChange={handleShortSelectChange}
        />
        <div className="productsRow listingPages">
          {isLoading ? (
            <Loader
              showOverlay={false}
              size={30}
              color="#B7854C"
              isLoading={false}
              showImg={true}
            />
          ) : products.length === 0 ? (
            <p className="noProduct" style={{ textAlign: "center" }}>
              {t("No products found.")}
            </p>
          ) : (
            <div className="product-container">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openCartPopup={openCartPopup}
                />
              ))}
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className="paginationWrapers">
            <p>
              {t("Total products:")} {products.length}
            </p>
            {totalPages > 1 && (
              <div className="pagNumbers">
                <ul className="paginationUl">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                      key={index + 1}
                      className={
                        currentPage === index + 1 ? "current-page" : ""
                      }
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
