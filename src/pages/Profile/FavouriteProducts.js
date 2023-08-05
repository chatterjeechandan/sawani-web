import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';
import products from "../../assets/images/p1s.png";
import heart from "../../assets/images/heart-2.png";
import rewards from "../../assets/images/rewardStar.png";

const FavouriteProducts = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper'>
                           <div className='favouriteTabs'>
                            <div className='favouritetabWraper'>
                            <Link to="/favourite-store" className="profileLinksTag"><span className=''>Favorite Stores</span></Link>
                            </div>
                            <div className='favouritetabWraper'>
                            <Link to="/favourite-product" className="profileLinksTag"> <span className='activates'>Favorite Products</span></Link>
                            </div>
                           </div>
                           <div className='tabContents'>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                                <div className='indProductsWraper'>
                                    <div className='imagePrd'>
                                        <img src={products} alt='' />
                                        <span className='likeProducts'>
                                            <img src={heart} alt='' />
                                        </span>
                                    </div>
                                    <h4 className='prodFavName'>Cookie & Cream</h4>
                                    <div className='pointsWraperInd'>
                                        <img src={rewards} className='rewardStars' />
                                        <span className='pointsDetails'><b>+50 Points</b></span>
                                    </div>
                                </div>
                           </div>
                           
                        </div>

                        <div className='questionsWrapers'>
                            <h3>We want to get to know you</h3>
                            <button className='qusBtn'>Answer Questionnaire</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FavouriteProducts;