import React, { useState, useContext, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import slideDown from "../assets/images/scroll.png";
import icon1 from "../assets/images/icon1.png";
import icon2 from "../assets/images/icon2.png";
import { Link } from 'react-router-dom';

const HomePage = () => {

  const scrollToBottom = () => {
    const bottomElement = document.getElementById('bottom');
    if (bottomElement) {
      bottomElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = 370;
      const offset = 20;
      const footerStartPoint = document.body.scrollHeight - window.innerHeight - footerHeight + offset;
      if (window.scrollY >= 480 && window.scrollY < footerStartPoint) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <div className="dashboardWraper" style={{ textAlign: "right" }}>
      <div className="bannerWrapers">
        <Header />
        {scrolled && (
           <Link to="/in-store"><span className='orderNowBtns'>Order Now</span></Link>          
        )}
        
        <div className="bannertextWraper">
          <p>Dummy test here</p>
          <h4>This is Dummy Text</h4>
        </div>
        <div className="slideDownBtnWraper">
          <p>Slide down</p>
          <span className="scrollDown" onClick={scrollToBottom}>
            <img src={slideDown} alt="" />
          </span>
        </div>
      </div>
      <div className="afterBanner left">
        <div className="afterBannerTextWraper">
          <h4>This is the heeading here</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis mollis nisl. Nullam consectetur pharetra erat eget convallis. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida.</p>
        </div>
      </div>

      <div className="afterBanner right">
        <div className="afterBannerTextWraper">
          <h4>This is the heeading here</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis mollis nisl. Nullam consectetur pharetra erat eget convallis. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida.</p>
        </div>
      </div>

      <div className="afterBanner center">
        <div className="afterBannerCenterTextWraper">
          <h4>This is the heeading here</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis mollis nisl. Nullam consectetur pharetra erat eget convallis. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis mollis nisl. Nullam consectetur pharetra erat eget convallis. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida.</p>
        </div>
      </div>

      <div className="sliderSection oneSlider" >
        <div className="rowSec">
          <div className="leftSection">
            <div className="sliderWraper">

              <div className="individualSliders">
                <div className="headingsWraper">
                  <span>
                    <img src={icon2} alt="" />
                  </span>
                  <h4>This is a dummy heading</h4>
                </div>
                <div className="contentWraper">
                  <p>Lorem ipsum is a dummy test used in the industry to write and read dummy texts where the content is not yet available, where the content is not yet available.</p>
                </div>
              </div>


            </div>
            <div className="staticSection">
              <div className="headingsWraper">
                <span>
                  <img src={icon2} alt="" />
                </span>
                <h4>This is a dummy heading</h4>
              </div>
              <div className="contentWraper">
                <p>Lorem ipsum is a dummy test used in the industry to write and read dummy texts where the content is not yet available, and read dummy texts where the content.</p>
              </div>
            </div>
          </div>
          <div className="rightSection">
            <div className="innerTextWraper">
              <div className="headingsWraper">
                <span>
                  <img src={icon1} alt="" />
                </span>
                <h4>This is the heeading here</h4>
              </div>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis mollis nisl. Nullam consectetur pharetra erat eget convallis. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida. Suspendisse posuere elit mi, sit amet finibus justo rutrum vitae. Proin ipsum nisl, efficitur rhoncus elementum sit amet, rhoncus eget mauris. Etiam sed velit quam. Duis ac lobortis sapien. Praesent sodales mauris justo, id ultricies lectus gravida sit amet. Mauris ac odio ipsum. Duis ornare purus non ligula condimentum, ac tristique ante gravida.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div id="bottom"></div>
    </div>

  );
};

export default HomePage;