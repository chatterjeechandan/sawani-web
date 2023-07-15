import React from 'react';

const ProductCard = ({ product }) => {
    const { title, image, price } = product;

    return (
        <div className="product-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>${price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductCard;