import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader showOverlay={false} />
            ) : (
                product ? (
                    <div>
                        <h2>{product.name}</h2>
                        <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
                        <p>Price: SAR {product.price}</p>
                        <p>Description: {product.description}</p>
                    </div>
                ) : (
                    <p>Product not found.</p>
                )
            )}
            <Footer />
        </div>
    );
};

export default Product;
