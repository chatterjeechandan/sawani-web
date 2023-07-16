import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { id, name, image, childCategories } = category;

  const scat = childCategories[0]?.id;
  const url = scat ? `/products/?pcat=${id}&scat=${scat}` : `/products/?pcat=${id}`;

  return (
    <div className='individualProduct'>
      <Link to={url} className="categoryLink" style={{ display: 'inline' }}>
        <img src={`data:image/png;base64,${image}`} alt={name} />
      </Link>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    childCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
    )
  }).isRequired
};

export default CategoryCard;
