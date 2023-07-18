import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import iconSelect from "../assets/images/iconSelect.png";
import love from "../assets/images/love.png";
import r1 from "../assets/images/r1.png";
import r2 from "../assets/images/r2.png";
import r3 from "../assets/images/r3.png";
import rewards from "../assets/images/reward.png";
import info from "../assets/images/info.png";
import plus from "../assets/images/addDetail.png";
import minus from "../assets/images/delDetail.png";
import dropimg from "../assets/images/drop.png";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            {isLoading ? (
                <Loader showOverlay={false} />
            ) : (
                product ? (
                    <>
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
                    <div className="productDetailsWraper">
                        <div className="detailsWraper">
                            <div className="productimg">
                                <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
                            </div>
                            <div className="productDetailsInfo">
                                <div className="bookMark">
                                    <img src={love} alt="" />
                                </div>
                                <h2 className="productName">{product.name}</h2>
                                <p className="productPrice">SAR {product.price}</p>
                                {/* <p className="productDescription"> {product.description}</p> */}
                                <p className="productDescription">Camel milk’s popularity is growing across the globe, with its health benefits demonstrated by desert nomads and Bedouin tribes.</p>
                                <div className="productOtherInfo">
                                    <p className="infoHeading">Size</p>
                                    <div className="infodetails">
                                        <span className="infoName">Content</span>
                                        <span className="dottedLines"></span>
                                        <span className="infoValues">1L</span>
                                    </div>
                                </div>
                                <div className="productOtherInfo">
                                    <p className="infoHeading">Ingredients</p>
                                    <div className="infodetails">
                                        <span className="infoName">Sugar</span>
                                        <span className="dottedLines"></span>
                                        <span className="infoValues">6g</span>
                                    </div>
                                    <div className="infodetails">
                                        <span className="infoName">Salt</span>
                                        <span className="dottedLines"></span>
                                        <span className="infoValues">3g</span>
                                    </div>
                                    <div className="infodetails">
                                        <span className="infoName">Minerals</span>
                                        <span className="dottedLines"></span>
                                        <span className="infoValues">0.3g</span>
                                    </div>
                                </div>
                            </div>
                            <div className="productOperationWrapers">
                               <div className="productOtherInfo">
                                    <p className="infoHeading">Available via</p>
                                    <div className="infodetails">
                                        <span className="availableinfo">
                                            <img src={r1} alt="" />
                                        </span>
                                        <span className="availableinfo">
                                            <img src={r2} alt="" />
                                        </span>
                                        <span className="availableinfo">
                                            <img src={r3} alt="" />
                                        </span>
                                    </div>
                                </div>
                                <div className="productOtherInfo rewardQntyWraper">
                                    <p className="infoHeading">Rewards</p>
                                    <span className="infoIconWraper">
                                        <img src={info} alt="" />
                                    </span>
                                    <div className="rewardSec">
                                        <span className="rewardIcon">
                                            <img src={rewards} alt="" />
                                        </span>
                                        <span className="rewardPointsInfo">
                                        +30 Points
                                        </span>
                                    </div>
                                </div>
                                <div className="productOtherInfo rewardQntyWraper">
                                    <div className="qntyWrapers">
                                        <span className="mainQtyWraper">
                                            <input type="number" value={1} className="productPieceQty" />
                                        </span>
                                        <span className="qtyText">Qnt.</span>
                                    </div>
                                    <div className="addDelBtn">
                                        <span className="delBtnWraper">
                                            <img src={minus} alt="" />
                                        </span>
                                        <span className="addBtnWraper">
                                            <img src={plus} alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        
                       
                        
                    </div>
                    </>
                ) : (
                    <p>Product not found.</p>
                )
            )}
            <Footer />
        </div>
    );
};

export default Product;
