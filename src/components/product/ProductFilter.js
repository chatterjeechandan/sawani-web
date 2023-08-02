import React, { useEffect, useState, useRef } from "react";
import iconSelect from "../../assets/images/iconSelect.png";
import dropimg from "../../assets/images/drop.png";
import { Link } from 'react-router-dom';

const ProductFilter = ({ categories, selectedCategory, scat, handleCategorySelect, onShortSelectChange }) => {
    const dropdownRef = useRef();
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropDownOpen(false);
        }
    };

    const handleCategoryClick = (category) => {
        handleCategorySelect(category);
        setDropDownOpen(false);
    };

    const handleShortSelectChange = (event) => {
        const selectedValue = event.target?.value;
        onShortSelectChange(selectedValue);
    };

    return (
        <div className='productFilterWraper'>
            <div className='customizeFilter'>
                <div className="dropdown" ref={dropdownRef}>
                    <div className='customizeFilterDisplay' onClick={setDropDownOpenFn}>
                        <span className="selectIcons">
                            <img src={iconSelect} alt='' />
                        </span>
                        <span className='selectText'>
                            {selectedCategory ? selectedCategory.name : 'Select Category'}
                        </span>
                        <span className='dropImages'>
                            <img src={dropimg} alt='' />
                        </span>
                    </div>
                    {dropDownOpen && (
                        <ul className='customDropdown'>
                            {categories.map((category) => {
                                if (Number(category.id) === Number(selectedCategory.id)) {
                                    return null;
                                }
                                return (
                                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                                        <span className="selectIcons">
                                            <img src={iconSelect} alt="Select" />
                                        </span>
                                        <span className="selectText">
                                            {category.name}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className='productOptions'>
                <ul className='productSubLists'>
                    {selectedCategory?.childCategories.map((subCategory) => {
                        return (
                            <li key={subCategory.id} className={Number(subCategory.id) === Number(scat) ? 'active' : ''}>
                                <Link to={`/products/?pcat=${selectedCategory.id}&scat=${subCategory.id}`} className="product-link" style={{ display: 'inline' }}>
                                    {subCategory.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='filterSections'>
                {/* <span className='filterDrop first'>
                    <select>
                        <option>Filter</option>
                    </select>
                    <span className='dropArrows'>
                        <img src={dropimg} alt='' />
                    </span>
                </span> */}
                <span className='filterDrop laste'>
                    <p>Filter- Sort By:</p>
                    <select onChange={(e) => handleShortSelectChange(e)}>
                        <option value="new">New Arrival</option>
                        <option value="price_high">Price High to Low</option>
                        <option value="price_low">Price Low to High</option>
                    </select>
                    <span className='dropArrows'>
                        <img src={dropimg} alt='' />
                    </span>
                </span>
            </div>
        </div>
    );
};

export { ProductFilter };
