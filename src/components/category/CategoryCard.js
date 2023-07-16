import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { id, name, image } = category;

  return (
    <div className='individualProduct'>
      <Link to={`/categories/${id}`} className="categoryLink">
        <img src={image} alt={name} />
        <h3 className="categoryName">{name}</h3>
      </Link>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default CategoryCard;
