import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Product.css';

const ProductCard = ({ product }) => {
    const { id, name, image, price } = product;

    return (
        <Link to={`/product/${id}`} className="product-link" style={{ display: 'inline' }}>
            <div className="product-card">
                <img src={`data:image/png;base64,${image}`} alt={name} className="product-image" />
                <h3 className="product-name">{name}</h3>
                <p className="product-price">SAR {price}</p>
                <div className="quantity-control">
                    <button className="quantity-btn">-</button>
                    <span className="quantity-counter">0</span>
                    <button className="quantity-btn">+</button>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default ProductCard;
