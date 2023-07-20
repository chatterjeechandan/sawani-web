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
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCounterOpen, setCounterOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState([]);
    const [provariant, setProvariant] = useState(null);

    const counteroptionFm = () => {
        setCounterOpen(!isCounterOpen);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response);
                setIsLoading(false);
                fetchNestedCategories(response);
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

    const fetchNestedCategories = async (productRes) => {
        try {
            const response = await fetchCategories();
            setCategories(response);
            response.find(category => {
                category.childCategories.find(subcategory => {
                    if (Number(subcategory.id) === Number(productRes.categoryId)) {
                        setSelectedCategory(category);
                    }
                })
            })
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (attributes.length > 0 && attributes.every((attr) => attr !== null && attr !== "")) {
            const variantRes = product.variants.find((variant) => {
                return variant.selectedValueIds.every((attrValue) => attributes.includes(Number(attrValue)));
            });
            setProvariant(variantRes);
        }
    }, [attributes, product?.variants]);

    const handleAttributeChange = (event, attributeId) => {
        const { value } = event.target;
        setAttributes((prevAttributes) => {
            const attributeIndexMap = product.attributes.reduce(
                (map, attribute, index) => {
                    map[attribute.id] = index;
                    return map;
                },
                {}
            );
            const updatedAttributes = [...prevAttributes];
            updatedAttributes[attributeIndexMap[attributeId]] = Number(value);
            return updatedAttributes.filter((item) => item !== "");
        });
    };

    const productImage = product?.image ? `data:image/png;base64,${product.image}` : placeholderImage;

    const handleShortSelectChange = (selectedValue) => {
        const url = selectedCategory.childCategories.length > 0 ? `/products/?pcat=${selectedCategory.id}&scat=${selectedCategory.childCategories[0].id}&sort=${selectedValue}` : `/products/?pcat=${selectedCategory.id}&sort=${selectedValue}`;
        navigate(url);
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            <div className='productPageWraper detailsPages'>
                <div className='productFilterWraper'>
                    <ProductFilter
                        categories={categories}
                        scat={product?.categoryId}
                        selectedCategory={selectedCategory}
                        handleCategorySelect={handleCategorySelect}
                        setSelectedCategory={setSelectedCategory}
                        onShortSelectChange={handleShortSelectChange}
                    />
                </div>
                {/* Other sections */}
            </div>
            <div className="productDetailsWraper extraProductsWraper">
                {isLoading ? (
                    <Loader showOverlay={false} size={30} color="#B7854C" isLoading={false} />
                ) : (
                    <div className="detailsWraper">
                        <div className="productimg">
                            <img src={`${productImage}`} alt={product.name} />
                        </div>
                        <div className="productDetailsInfo">
                            <div className="bookMark">
                                <img src={love} alt="" />
                            </div>
                            <h2 className="productName">{!provariant?.displayName ? product.name : provariant?.displayName}</h2>
                            <p className="productPrice">SAR {!provariant?.price ? product.price : provariant?.price}</p>
                            <p className="productDescription">{product.description}</p>
                            <div className="productOtherInfo">
                                {product.attributes.length > 0 && (
                                    <p className="infoHeading">Product Option</p>
                                )}
                                <div className="config-option">
                                    {product.attributes.map((attribute) => (
                                        <div className="productOtherInfo" key={attribute.id}>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                <InputLabel id={`attribute-select-label-${attribute.id}`}>
                                                    {attribute.name}
                                                </InputLabel>
                                                <Select
                                                    labelId={`attribute-select-label-${attribute.id}`}
                                                    id={`attribute-select-${attribute.id}`}
                                                    value={attribute.isSelected}
                                                    label={attribute.name}
                                                    onChange={(event) => handleAttributeChange(event, attribute.id)}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {attribute.values.map((value) => (
                                                        <MenuItem key={value.id} value={value.id}>
                                                            {value.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* ... */}
                                        </div>
                                    ))}
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
                                    {product.availableVia.includes("In-store") && (
                                        <span className="availableinfo">
                                            <img src={r1} alt="" />
                                        </span>
                                    )}
                                    {product.availableVia.includes("Pick-up") && (
                                        <span className="availableinfo">
                                            <img src={r2} alt="" />
                                        </span>
                                    )}
                                    {product.availableVia.includes("Delivery") && (
                                        <span className="availableinfo">
                                            <img src={r3} alt="" />
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="productOtherInfo rewardQntyWraper">
                                <p className="infoHeading">Rewards</p>
                                <span className="infoIconWraper">
                                    <Tooltip title="This is the rewards point" arrow>
                                        <img src={info} alt="" />
                                    </Tooltip>
                                </span>
                                <div className="rewardSec">
                                    <span className="rewardIcon">
                                        <img src={rewards} alt="" />
                                    </span>
                                    <span className="rewardPointsInfo">
                                        +{product.rewards} Points
                                    </span>
                                </div>
                            </div>
                            <div className="productOtherInfo rewardQntyWraper">
                                <div className="qntyWrapers">
                                    <span className="mainQtyWraper">
                                        <input type="number" value={0} className="productPieceQty" />
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
                    <div className="productsDisplayWraper extraProducts">

                        <div className="indrelatesProduct">
                            <div className="imageWraper">
                                <img src={productInd} className="prdtImgs" alt="" />
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
                                <img src={productInd} className="prdtImgs" alt="" />
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
                                <img src={productInd} className="prdtImgs" alt="" />
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
                                <img src={productInd} className="prdtImgs" alt="" />
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
                                <img src={productInd} className="prdtImgs" alt="" />
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
                                <img src={productInd} className="prdtImgs" alt="" />
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

