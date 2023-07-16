import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import slideDown from "../assets/images/scroll.png";
import icon1 from "../assets/images/icon1.png";
import icon2 from "../assets/images/icon2.png";
import icon3 from "../assets/images/icon3.png";
import ficon1 from "../assets/images/ficon1.png";
import midslidericon1 from "../assets/images/midslidericon1.png";

const HomePage = () => {
    // Sample data for featured products
    const featuredProducts = [
        {
            id: 1,
            title: 'Product 1',
            image: 'product1.jpg',
            price: 10.99,
        },
        {
            id: 2,
            title: 'Product 2',
            image: 'product2.jpg',
            price: 19.99,
        },
        // Add more products as needed
    ];

    return (
        <div  className="dashboardWraper" style={{textAlign:"right"}}>
        <div className="bannerWrapers">
            <Header />
            {/* <div className="product-list">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div> */}
    
     
      <div className="bannertextWraper">
        <p>Dummy test here</p>
        <h4>This is Dummy Text</h4>
      </div>
      <div className="slideDownBtnWraper">
        <p>Slide down</p>
        <span className="scrollDown">
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
        </div>
    );
};

export default HomePage;