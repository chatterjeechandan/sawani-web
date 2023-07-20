import React, { useEffect, useState } from "react";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProductsbyCat } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import ProductCard from '../components/product/ProductCard';
import { fetchCategories } from '../api/category';
import { ProductFilter } from '../components/product/ProductFilter';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pcat = searchParams.get('pcat');
    const scat = searchParams.get('scat');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetchProductsbyCat(1, scat);
                setProducts(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [scat]);

    useEffect(() => {
        const fetchNestedCategories = async () => {
            try {
                const response = await fetchCategories();
                setCategories(response);
                const selectedCategory = response.find(category => Number(category.id) === Number(pcat))
                setSelectedCategory(selectedCategory);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNestedCategories();
    }, [pcat]);

    const handleCategorySelect = (category) => {
        const url = category.childCategories.length > 0 ? `/products/?pcat=${category.id}&scat=${category.childCategories[0].id}` : `/products/?pcat=${category.id}`;
        navigate(url);
        setSelectedCategory(category);
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            <div className='productPageWraper'>
                <ProductFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    scat={scat}
                    handleCategorySelect={handleCategorySelect}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className='productsRow listingPages'>
                    {isLoading ? (
                        <Loader showOverlay={false} />
                    ) : (
                        (products.length === 0 ? (
                            <p style={{ 'textAlign': 'center' }}>No products found.</p>
                        ) : (
                            <div className="product-container">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ))
                    )}
                </div>
                <div className="paginationWrapers">
                    <p>Total products  77</p>
                    <div className="pagNumbers">
                    <ul className="paginationUl">
                        <li className="current-page">1</li>
                        <li>2</li>
                        <li className="midPages">------</li>
                        <li>4</li>
                    </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
