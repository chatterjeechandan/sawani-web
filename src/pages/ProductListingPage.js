import React, { useState, useContext } from 'react';
import Header from '../components/common/layout/Header/Header';
import iconSelect from "../assets/images/iconSelect.png";
import dropimg from "../assets/images/drop.png";
import Footer from '../components/common/layout/Footer';

const ProductListingPage = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
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

            

            </div>
            
        </div>
        <Footer />
        </div>
    );
};

export default ProductListingPage;