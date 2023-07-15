import React from 'react';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
    // Sample data for featured products
    const featuredProducts = [
        {
            id: 1,
            title: 'Product 1',
            image: 'product1.jpg',
            price: 10.99,
        },
        {
            id: 2,
            title: 'Product 2',
            image: 'product2.jpg',
            price: 19.99,
        },
        // Add more products as needed
    ];

    return (
        <div>
            <Header />
            <div className="product-list">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;