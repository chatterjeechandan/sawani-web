import React, { useEffect, useState, useRef } from "react";
import iconSelect from "../../assets/images/iconSelect.png";
import dropimg from "../../assets/images/drop.png";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductFilter = ({
  categories,
  selectedCategory,
  scat,
  handleCategorySelect,
  onShortSelectChange,
}) => {
  const { t } = useTranslation();
  const dropdownRef = useRef();
  const shortDropdownRef = useRef();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [sortdropDownOpen, setSortdropDownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState({ value: "new", label: t("New Arrival") });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortUrl = searchParams.get("sort");
  

  const sorts = [
    { value: "new", label: t("New Arrival") },
    { value: "price_high", label: t("Price High to Low") },
    { value: "price_low", label: t("Price Low to High") }
  ];

  const setDropDownOpenFn = () => {
    setDropDownOpen(!dropDownOpen);
  };
  

  useEffect(() => {
    if(sortUrl){
      const selectedSortObj = sorts.find(sort => sort.value === sortUrl);
      setSelectedSort(selectedSortObj);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOpen(false);
    }
    if (shortDropdownRef.current && !shortDropdownRef.current.contains(event.target)) {
      setSortdropDownOpen(false);
    }
  };

  const handleCategoryClick = (category) => {
    handleCategorySelect(category);
    setDropDownOpen(false);
  };

  const handleShortSelectChange = (event,short) => {
    setSelectedSort(short);
    onShortSelectChange(short.value);
    setSortdropDownOpen(false);
  };

  return (
    <div className="productFilterWraper">
      <div className="customizeFilter">
        <div className="dropdown" ref={dropdownRef}>
          <div className="customizeFilterDisplay" onClick={setDropDownOpenFn}>
            <span className="selectIcons">
              <img src={iconSelect} alt="" />
            </span>
            <span className="selectText">
              {selectedCategory ? selectedCategory.name : "Select Category"}
            </span>
            <span className="dropImages">
              <img src={dropimg} alt="" />
            </span>
          </div>
          {dropDownOpen && (
            <ul className="customDropdown">
              {categories.map((category) => {
                if (Number(category.id) === Number(selectedCategory.id)) {
                  return null;
                }
                return (
                  <li
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="selectIcons">
                      <img src={iconSelect} alt="Select" />
                    </span>
                    <span className="selectText">{category.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {/* <div className='productOptions'>
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
            </div> */}
      <div className="filterSections">
        {/* <span className='filterDrop first'>
                    <select>
                        <option>Filter</option>
                    </select>
                    <span className='dropArrows'>
                        <img src={dropimg} alt='' />
                    </span>
                </span> */}
        <span className="filterDrop laste">
          <p>{t("Sort By:")} </p>
          {/* <select onChange={(e) => handleShortSelectChange(e)}>
            <option value="new" selected={sort === "new" || !sort}>
              {t("New Arrival")}
            </option>
            <option value="price_high" selected={sort === "price_high"}>
              {t("Price High to Low")}
            </option>
            <option value="price_low" selected={sort === "price_low"}>
              {t("Price Low to High")}
            </option>
          </select>
          <span className="dropArrows">
            <img src={dropimg} alt="" />
          </span> */}
           <div className="dropdown sort-drop" ref={shortDropdownRef}>
      <div className="customizeFilterDisplay" onClick={() => setSortdropDownOpen(!sortdropDownOpen)}>
        <span className="selectText">
          {selectedSort ? t(selectedSort.label) : "Select Sorting"}
        </span>
        <span className="dropImages">
          <img src={dropimg} alt="arrow" />
        </span>
      </div>
      {sortdropDownOpen && (
        <ul className="customDropdown">
          {sorts.map((sort) => (
            <li
              key={sort.value}
              onClick={(e) => handleShortSelectChange(e,sort)}
            >
              <span className="selectText">{sort.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
        </span>
      </div>
    </div>
  );
};

export { ProductFilter };
