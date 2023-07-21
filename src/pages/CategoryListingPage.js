import React, { useState, useEffect, useContext } from "react"
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import CategoryCard from "../components/category/CategoryCard";
import tab1 from "../assets/images/cart.png";
import tab2 from "../assets/images/pickup.png";
import tab3 from "../assets/images/delhivery.png";
import search from "../assets/images/search.png";
import pots from "../assets/images/pots.png";
import Loader from '../components/common/Loader/Loader';
import { fetchCategories } from '../api/category';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../utils/CategoryContext';

const CategoryListingPage = () => {
    document.title = "SAWANI CATEGORY";
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('inStore');
    const { categories, updateCategoryItems } = useContext(CategoryContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!categories) {
                try {
                    const response = await fetchCategories();
                    updateCategoryItems(response);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                } finally {
                    setIsLoading(false);
                }
            }
            else {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case 'inStore':
                navigate('/category');
                break;
            case 'delivery':
                navigate('/delivery');
                break;
            default:
                break;
        }
    };

    return (
        <div className="dashboardPageMaimWraper">
            <Header />
            <div className="dashboardMidContent">
                <div className='tabSearchWraper'>
                    <div className='tabWraper'>
                        <ul className='tabUl'>
                            <li className={activeTab === 'inStore' ? 'active' : ''} onClick={() => handleTabClick('inStore')}>
                                <span>
                                    <img src={tab1} alt='' />
                                </span>
                                In-Store
                            </li>
                            <li>
                                <span>
                                    <img src={tab2} alt='' />
                                </span>
                                Pick up
                            </li>
                            <li className={activeTab === 'delivery' ? 'active' : ''} onClick={() => handleTabClick('delivery')}>
                                <span>
                                    <img src={tab3} alt='' />
                                </span>
                                Delivery
                            </li>
                        </ul>
                    </div>
                    <div className='searchWraper'>
                        <div className='searchArea'>
                            <input type='text' className='searchInput' />
                            <span className='searchIcon'>
                                <img src={search} alt='' />
                            </span>
                        </div>
                        <button className='searchBtn'>Locate me</button>
                    </div>
                </div>
                <div className='tabContentWraper'>
                    <div className='pageHeadingWraper'>
                        <span className='headingImage'>
                            <img src={pots} alt='' />
                        </span>
                        <span className='headingContents'>
                            <h3>Available in-store</h3>
                            <p>Browse from our not only delicious but healthier options</p>
                        </span>
                    </div>
                    <div className='productlistingsStore'>
                        {isLoading ? (
                            <Loader showOverlay={false} size={30} color="#B7854C" isLoading={false} />
                        ) : (
                            categories?.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CategoryListingPage;