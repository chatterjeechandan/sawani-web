import React, { useState, useEffect, useContext, useRef } from "react"
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import CategoryCard from "../components/category/CategoryCard";
import tab1 from "../assets/images/t1A.png";
import tab2 from "../assets/images/t2.png";
import tab3 from "../assets/images/t3.png";
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
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        window.scrollTo(0, 0);
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
                navigate('/in-store');
                break;
            case 'delivery':
                navigate('/delivery');
                break;
            default:
                break;
        }
    };

    const inputRef = useRef(null);

    useEffect(() => {

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                setLocation({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
                setAddress(place.formatted_address);
            }
        });

        return () => {
            window.google.maps.event.clearInstanceListeners(autocomplete);
        };
    }, []);

    function getCurrentLocation(callback) {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            callback({ lat: latitude, lng: longitude });
        }

        function error() {
            alert('Unable to retrieve your location.');
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    function reverseGeocode(coords) {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ 'location': coords }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setAddress(results[0].formatted_address);
                    setLocation(coords);  // Set the coordinates in state
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }

    const handleGetCurrentLocation = () => {
        getCurrentLocation(coords => {
            reverseGeocode(coords);
        });
    }

    function handleInputChange(e) {
        setAddress(e.target.value);
    }

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
                        </ul>
                    </div>
                    <div className='searchWraper'>
                        <div className='searchArea'>
                            <input type='text' className='searchInput' ref={inputRef} placeholder="Enter a location" value={address} onChange={handleInputChange}/>
                            <span className='searchIcon'>
                                <img src={search} alt='' />
                            </span>
                        </div>
                        <button className='searchBtn' onClick={handleGetCurrentLocation}>Locate me</button>
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