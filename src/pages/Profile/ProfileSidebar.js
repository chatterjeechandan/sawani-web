import React, { useState, useContext, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import profile from "../../assets/images/profile.png";
import profileIcon from "../../assets/images/camelIcon.png";
import reward from "../../assets/images/rewardStar.png";
import edits from "../../assets/images/edits.png";
import qr from "../../assets/images/qr-code-2.png";
import routIcon1 from "../../assets/images/crypto.png";
import routIcon2 from "../../assets/images/loveIcon.png";
import routIcon3 from "../../assets/images/credit-card-4.png";
import routIcon4 from "../../assets/images/location@2x.png";
import barCode from "../../assets/images/barCode.png";

const ProfileSidebar = () => {
    const [isQrOpen, setIsQrOpen] = useState(false);
    const setIsQrOpenFn = () => {
        setIsQrOpen(!isQrOpen);
    };
    return (
        <div className='profileSidebarWraper'>
            <div className='sideProfileTop'>
                <div className='profileImgWraper'>
                    <span className='profileImg'>
                        <img src={profile} className='profileImages' alt='' />
                        <img src={profileIcon} className='profileCamel' alt=''/>
                    </span>
                    <p className='profileName'>Aisha Fahd</p>
                </div>
                <div className='profilePointWraper'>
                    <span className='editPointsSec'>
                        <img src={edits} alt='' />
                    </span>
                    <div className='pointsProfileWrapers'>
                        <h3>300</h3>
                        <img src={reward} alt='' />
                    </div>
                    <p className='converstionRate'>Equals to <span>3.00 SAR</span></p>
                    <p className='numberInfo'>Your Sawani Rewards Number</p>
                    <div className='codeQr' onClick={setIsQrOpenFn} >
                        <img src={qr} className='codeScan' />E01N-98OL-3D5U
                    </div>
                </div>
            </div>

            <div className='sideProfileMid'>
                <ul className='profileRouts'>
                    <li className="activated">
                    <Link to="/profile" className="profileLinksTag">
                        <span className='iconName'>
                            <img src={routIcon1} className='routIcon' />
                        </span>
                        <span className='nameLink'>Points Analysis</span>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                    </li>
                    <li className="">
                    <Link to="/favourite-store" className="profileLinksTag">
                        <span className='iconName'>
                            <img src={routIcon2} className='routIcon' />
                        </span>
                        <span className='nameLink'>Favorites</span>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/saved-card" className="profileLinksTag">
                        <span className='iconName'>
                            <img src={routIcon3} className='routIcon' />
                        </span>
                        <span className='nameLink'>My Cards</span>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                    </li>
                    <li className="">
                    <Link to="/saved-address" className="profileLinksTag">
                        <span className='iconName'>
                            <img src={routIcon4} className='routIcon' />
                        </span>
                        <span className='nameLink'>My Addresses</span>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='refferWraper'>
                <h4>Want more benefits!</h4>
                <p>Refer a friend and enjoy more rewards <br /> together</p>
                <button className='refferBtn'>Refer a friend</button>
            </div>

            {isQrOpen && (
                    <div className="popup-overlay" >
                
                    <div className="popup-content barCodesPopup" onClick={setIsQrOpenFn}>
                        <p className='barCodeHeadingP'>Scan to earn<br /> <span>SAWANI©</span> Points</p>
                        <img src={barCode} className='barCodeImg' />
                        <p className='idBar'>E01N-98OL-3D5U</p>
                    </div>
                </div>
            )}
        </div>



    );
};

export default ProfileSidebar;