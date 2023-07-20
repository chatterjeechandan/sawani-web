import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Product.css';
import add from "../../assets/images/addCounter.png";
import placeholderImage from "../../assets/images/no-image.png";

const ProductCard = ({ product }) => {
    const { id, name, image, price } = product;

    const handleAddClick = (event, product) => {
        event.preventDefault();
        console.log(product);
    };

    const productImage = image ? `data:image/png;base64,${image}` : placeholderImage;

    return (
        <div className='indProduct'>
            <Link to={`/product/${id}`} className="product-link" style={{ display: 'inline' }}>
                <span className='produtImage'>
                    <img src={productImage} alt={name} className="product-image" />
                    <span className='addDelWraper'>
                        <span className='addSec' onClick={(e) => handleAddClick(e, product)}>
                            <img src={add} alt='' />
                        </span>
                    </span>
                </span>
                <span className='productInfoDetails'>
                    <h5>{name}</h5>
                    <p>{price} SAR</p>
                </span>
            </Link>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default ProductCard;
