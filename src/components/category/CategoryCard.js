import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/images/no-image.png";

const CategoryCard = ({ category }) => {
  const { id, name, image } = category;

  return (
    <div className="individualProduct">
      <Link
        to={`/products/${id}`}
        className="categoryLink"
        style={{ display: "inherit" }}
      >
        <img
          src={image ? `data:image/png;base64,${image}` : placeholderImage}
          alt={name}
        />
        <p>{name}</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
