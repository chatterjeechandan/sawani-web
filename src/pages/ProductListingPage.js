import React, { useEffect, useState } from "react";
import Header from '../components/common/layout/Header/Header';
import iconSelect from "../assets/images/iconSelect.png";
import dropimg from "../assets/images/drop.png";
import Footer from '../components/common/layout/Footer';
import { useLocation } from 'react-router-dom';
import { fetchProductsbyCat } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import ProductCard from '../components/product/ProductCard';


const ProductList = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const scat = searchParams.get('scat');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchProductsbyCat(1, scat);
                setProducts(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [scat]);


    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            <div className='productPageWraper'>
                <div className='productFilterWraper'>
                    <div className='customizeFilter'>
                        <div className='customizeFilterDisplay' onClick={setDropDownOpenFn}>
                            <span className="selectIcons">
                                <img src={iconSelect} alt='' />
                            </span>
                            <span className='selectText'>
                                Gourmet
                            </span>
                            <span className='dropImages'>
                                <img src={dropimg} alt='' />
                            </span>
                        </div>
                        {dropDownOpen && (
                            <ul className='customDropdown'>
                                <li>
                                    <span className="selectIcons">
                                        <img src={iconSelect} alt='' />
                                    </span>
                                    <span className='selectText'>
                                        Gourmet One
                                    </span>
                                </li>
                                <li>
                                    <span className="selectIcons">
                                        <img src={iconSelect} alt='' />
                                    </span>
                                    <span className='selectText'>
                                        Gourmet Two
                                    </span>
                                </li>
                                <li>
                                    <span className="selectIcons">
                                        <img src={iconSelect} alt='' />
                                    </span>
                                    <span className='selectText'>
                                        Gourmet Three
                                    </span>
                                </li>
                                <li>
                                    <span className="selectIcons">
                                        <img src={iconSelect} alt='' />
                                    </span>
                                    <span className='selectText'>
                                        Gourmet Four
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className='productOptions'>
                        <ul className='productSubLists'>
                            <li className='active'>Milk</li>
                            <li>Cream</li>
                            <li>Cheese</li>
                            <li>Yogurt</li>
                            <li>Butter</li>
                            <li>Sour Cream</li>
                        </ul>
                    </div>
                    <div className='filterSections'>
                        <span className='filterDrop first'>
                            <select>
                                <option>Filter</option>
                            </select>
                            <span className='dropArrows'>
                                <img src={dropimg} alt='' />
                            </span>
                        </span>
                        <span className='filterDrop laste'>
                            <select>
                                <option>Sort</option>
                            </select>
                            <span className='dropArrows'>
                                <img src={dropimg} alt='' />
                            </span>
                        </span>
                    </div>
                </div>
                <div className='productsRow'>
                    {isLoading ? (
                        <Loader showOverlay={false} />
                    ) : (
                        (products.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            <div className="product-container">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;

