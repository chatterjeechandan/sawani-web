import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/product';
import Loader from '../components/common/Loader/Loader';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import { ProductFilter } from '../components/product/ProductFilter';
import love from "../assets/images/love.png";
import r1 from "../assets/images/r1.png";
import r2 from "../assets/images/r2.png";
import r3 from "../assets/images/r3.png";
import rewards from "../assets/images/reward.png";
import info from "../assets/images/info.png";
import plus from "../assets/images/addDetail.png";
import minus from "../assets/images/delDetail.png";
import productInd from "../assets/images/pr1.png";
import counterPlus from "../assets/images/smallPlus.png";
import counterMinus from "../assets/images/smallMinus.png";
import camel from "../assets/images/camelWhite.png";
import placeholderImage from "../assets/images/no-image.png";
import { fetchCategories } from '../api/category';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCounterOpen, setCounterOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const counteroptionFm = () => {
        setCounterOpen(!isCounterOpen);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                console.log(response);
                setProduct(response);
                setIsLoading(false);
                fetchNestedCategories();
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCategorySelect = (category) => {
        const url = category.childCategories.length > 0 ? `/products/?pcat=${category.id}&scat=${category.childCategories[0].id}` : `/products/?pcat=${category.id}`;
        navigate(url);
        setSelectedCategory(category);
    };

    const fetchNestedCategories = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response);
            //const selectedCategory = response.find(category => Number(category.id) === Number(pcat))
            //setSelectedCategory(selectedCategory);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const productImage = product?.image ? `data:image/png;base64,${product.image}` : placeholderImage;

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            <div className='productPageWraper'>
                <div className='productFilterWraper'>
                    <ProductFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        handleCategorySelect={handleCategorySelect}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
                {/* Other sections */}
            </div>
            <div className="productDetailsWraper">
                {isLoading ? (
                    <Loader showOverlay={false} />
                ) : (
                    <div className="detailsWraper">
                        <div className="productimg">
                            <img src={`${productImage}`} alt={product.name} />
                        </div>
                        <div className="productDetailsInfo">
                            <div className="bookMark">
                                <img src={love} alt="" />
                            </div>
                            <h2 className="productName">{product.name}</h2>
                            <p className="productPrice">SAR {product.price}</p>
                            <p className="productDescription">{product.description}</p>
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
                )}
                <div className="relatedProductWraper">
                    <div className="relativeProductHeading">
                        <span className="headingIconImg">
                            <img src={camel} alt="" />
                        </span>
                        <h4>You might also like</h4>
                    </div>
                    <div className="productsDisplayWraper">

                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter" onClick={counteroptionFm}>
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {isCounterOpen && (
                                        <>
                                            <span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span>
                                        </>
                                    )}

                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>
                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {/* <span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span> */}
                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>
                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {/* <span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span> */}
                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>
                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {/* <span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span> */}
                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>
                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {/* <span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span> */}
                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>

                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} alt="" />
                                <span className="counterWraper">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    {/*<span className="counterInput">
                                                <input type="number" className="inputCounter" value={1} />
                                            </span>
                                            <span className="minusCounter">
                                                <img src={counterMinus} alt="" />
                                            </span> */}
                                </span>
                            </div>
                            <div className="productNamePrice">
                                <h5>Date Milk</h5>
                                <p>250.00 SAR</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;

