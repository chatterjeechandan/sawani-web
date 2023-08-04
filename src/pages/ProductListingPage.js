import React, { useEffect, useState, useContext, useRef } from "react";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProductsbyCat } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import ProductCard from '../components/product/ProductCard';
import { ProductFilter } from '../components/product/ProductFilter';
import { CategoryContext } from '../utils/CategoryContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { categories } = useContext(CategoryContext);
    const pcat = searchParams.get('pcat');
    const scat = searchParams.get('scat');
    const sort = searchParams.get('sort');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, [pcat, scat, sort]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        selectCategory();
    }, [categories]);

    const selectCategory = () => {
        if (!categories) {
            return;
        }
        const selectedCategory = categories.find(category => Number(category.id) === Number(pcat))
        setSelectedCategory(selectedCategory);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetchProductsbyCat(1, pcat, sort);
            setProducts(response);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setIsLoading(false);
        }
    };

    const handleCategorySelect = (category) => {
        const url = category.childCategories.length > 0 ? `/products/?pcat=${category.id}&scat=${category.childCategories[0].id}` : `/products/?pcat=${category.id}`;
        navigate(url);
        setSelectedCategory(category);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShortSelectChange = (selectedValue) => {
        const url = scat ? `/products/?pcat=${pcat}&scat=${scat}&sort=${selectedValue}` : `/products/?pcat=${pcat}&sort=${selectedValue}`;
        navigate(url);
    };

    const headerRef = useRef(null);

    const openCartPopup = () => {
        if (headerRef.current && headerRef.current.openCartPopup) {
            headerRef.current.openCartPopup();
        }
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header ref={headerRef} />
            <div className='productPageWraper'>
                <ProductFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    scat={scat}
                    handleCategorySelect={handleCategorySelect}
                    setSelectedCategory={setSelectedCategory}
                    onShortSelectChange={handleShortSelectChange}
                />
                <div className='productsRow listingPages'>
                    {isLoading ? (
                        <Loader showOverlay={false} size={30} color="#B7854C" isLoading={false} />
                    ) : (
                        (products.length === 0 ? (
                            <p className="noProduct" style={{ 'textAlign': 'center' }}>No products found.</p>
                        ) : (
                            <div className="product-container">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} openCartPopup={openCartPopup} />
                                ))}
                            </div>
                        ))
                    )}
                </div>
                {products.length > 0 && (
                    <div className="paginationWrapers">
                        <p>Total products: {products.length}</p>
                        <div className="pagNumbers">
                            <ul className="paginationUl">
                                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                                    <li
                                        key={index + 1}
                                        className={currentPage === index + 1 ? "current-page" : ""}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
