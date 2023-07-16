import React, { useState } from "react"
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import tab1 from "../assets/images/cart.png";
import tab2 from "../assets/images/pickup.png";
import tab3 from "../assets/images/delhivery.png";
import search from "../assets/images/search.png";
import { useNavigate } from 'react-router-dom';

const DeliveryPage = () => {
    document.title = "SAWANI DELIVERY";
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('delivery');

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
                                Delhivery
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
                    Test content here....
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DeliveryPage;