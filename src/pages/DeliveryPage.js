import React, { useState } from "react"
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import tab1 from "../assets/images/t1.png";
import tab2 from "../assets/images/t2.png";
import tab3 from "../assets/images/t3A.png";
import search from "../assets/images/search.png";
import apple from "../assets/images/apple.png";
import android from "../assets/images/android.png";
import camel from "../assets/images/delhiveryBanner.png";
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
            <div className="dashboardMidContentDelhivery">
                <div className='tabSearchWraper'>
                    <div className='tabWraper'>
                        <ul className='tabUl'>
                            <li className={activeTab === 'inStore' ? 'active' : ''} onClick={() => handleTabClick('inStore')}>
                                <span>
                                    <img src={tab1} alt='' />
                                </span>
                            </li>
                            <li>
                                <span>
                                    <img src={tab2} alt='' />
                                </span>
                            </li>
                            <li className={activeTab === 'delivery' ? 'active' : ''} onClick={() => handleTabClick('delivery')}>
                                <span>
                                    <img src={tab3} alt='' />
                                </span>
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
                <div className='tabContentWraper delhiveryTabContent'>
                    <div className="leftInfoContent">
                        <h3 className="blackHeading">WANT IT DELIVERED?</h3>
                        <h2 className="brownHeading">Download the APP</h2>
                        <p>Earn points and redeem rewards. Order ahead <br />and pay. And get it delivered!</p>
                        <div className="appBtn Wrapers">
                            <span className="appleWraper">
                                <img src={apple} alt="" />
                            </span>
                            <span className="androidWraper">
                                <img src={android} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="rightDivwraper">
                        <img src={camel} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DeliveryPage;