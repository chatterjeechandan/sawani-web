import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Product.css';
import add from "../../assets/images/addCounter.png";

const ProductCard = ({ product }) => {
    const { id, name, image, price } = product;

    return (

        <div className='indProduct'>
            <Link to={`/product/${id}`} className="product-link" style={{ display: 'inline' }}>
                <span className='produtImage'>
                    <img src={`data:image/png;base64,${image}`} alt={name} className="product-image" />
                    <span className='addDelWraper'>
                        <span className='addSec'>
                            <img src={add} alt='' />
                        </span>
                    </span>
                </span>
                <span className='productInfoDetails'>
                    <h5>{name}</h5>
                    <p>{price} SAR</p>
                </span>
            </Link>
        </div >

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
