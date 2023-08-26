import React, { useState, useEffect, useRef } from "react";
import search from "../../assets/images/search.png";
import { useTranslation } from "react-i18next";

const GeoLocationComponent = () => {
  const [address, setAddress] = useState("");
  const [setLocation] = useState({ lat: null, lng: null });
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const currentLanguage = i18n.language;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLooDo7_YuZa_ZW2zUtE7nOUGJsP_8guQ&libraries=places&language=${currentLanguage}`;
    script.async = true;
    
    script.onload = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry && place.geometry.location) {
          setLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          setAddress(place.formatted_address);
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.google && autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  function getCurrentLocation(callback) {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      callback({ lat: latitude, lng: longitude });
    }

    function error() {
      alert("Unable to retrieve your location.");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function reverseGeocode(coords) {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setAddress(results[0].formatted_address);
          setLocation(coords);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  const handleGetCurrentLocation = () => {
    getCurrentLocation((coords) => {
      reverseGeocode(coords);
    });
  };

  function handleInputChange(e) {
    setAddress(e.target.value);
  }

  return (
    <div className="searchWraper">
      <div className="searchArea">
        <input
          type="text"
          className="searchInput"
          ref={inputRef}
          placeholder={t("Enter a location")}
          value={address}
          onChange={handleInputChange}
        />
        <span className="searchIcon">
          <img src={search} alt="" />
        </span>
      </div>
      <button className="searchBtn" onClick={handleGetCurrentLocation}>
        {t("Locate me")}
      </button>
    </div>
  );
};

export { GeoLocationComponent };
