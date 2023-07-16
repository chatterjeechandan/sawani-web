import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import { fetchProductsbyCat } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const scat = searchParams.get('scat');

    useEffect(() => {
        const fetchProducts = async () => {
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

    return (
        <div>
            <Header />
            <h2>Product List</h2>
            {isLoading ? (
                <Loader showOverlay={false} />
            ) : (
                (products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="product-container">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ))
            )}
            <Footer />
        </div>
    );
};

export default ProductList;

