import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import placeholderImage from "../../assets/images/no-image.png";

const CategoryCard = ({ category }) => {
  const { id, name, image, childCategories } = category;

  const scat = childCategories[0]?.id;
  const url = scat ? `/products/?pcat=${id}&scat=${scat}` : `/products/?pcat=${id}`;

  const categoryImage = image ? `data:image/png;base64,${image}` : placeholderImage;

  return (
    <div className='individualProduct'>
      <Link to={url} className="categoryLink" style={{ display: 'inline' }}>
        <img src={categoryImage} alt={name} />
      </Link>
    </div>
  );
};

export default CategoryCard;
