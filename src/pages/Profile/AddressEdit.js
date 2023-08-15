import React, { useState, useEffect } from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import { useTranslation } from "react-i18next";
import Loader from "../../components/common/Loader/Loader";
import Toaster from "../../components/common/Toaster/Toaster";
import { addCustomerAddress, updateAddress } from "../../api/customer";
import { getCitiesAPI } from "../../api/lookup";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const AddressEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInlineLoading, setIsInlineLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [allCities, setAllCities] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const passedAddress = location.state?.data;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    building: "",
    unit: "",
    region: "",
    note: "",
    cityId: "",
    lat: null,
    long: null,
  });

  useEffect(() => {
    if (passedAddress) {
      setFormData((prevUserInfo) => ({
        ...prevUserInfo,
        name: passedAddress?.name || "",
        phone: passedAddress?.phone || "",
        street: passedAddress?.street || "",
        building: passedAddress?.building || "",
        unit: passedAddress?.unit || "",
        region: passedAddress?.region || "",
        note: passedAddress?.note || "",
        cityId: passedAddress?.cityId || "",
        lat: passedAddress?.lat || null,
        long: passedAddress?.long || null,
      }));
    }
  }, [passedAddress]);

  useEffect(() => {
    getAllCities();    
  }, []);

  const getAllCities = async () => {
    setIsInlineLoading(true);
    try {
      const response = await getCitiesAPI();
      if (response.data.length > 0) {
        setAllCities(response.data);
        setIsInlineLoading(false);
      }
    } catch (error) {
      console.error("Error fetching delivery methods:", error);
    }
  };

  const validatename = (nameValue) => {
    const newErrors = {};
    if (!nameValue.trim()) {
      newErrors.name = t("Full Name is required");
    } else {
      newErrors.name = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.name === '' ? true : false;
  };
  
  const validatePhoneNumber = (phoneNumberValue) => {
    const newErrors = {};
    const mobileFormat = /^9665\d{8}$/;
    console.log(phoneNumberValue);
    if (!phoneNumberValue.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!phoneNumberValue.match(mobileFormat)) {
      newErrors.phone = t("Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit.");
    } else {
      newErrors.phone = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.phone === '' ? true : false;
  };
  
  const validateStreet = (streetValue) => {
    const newErrors = {};
    if (!streetValue.trim()) {
      newErrors.street = t("Street is required");
    } else {
      newErrors.street = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.street === '' ? true : false;
  };
  
  const validateBuilding = (buildingValue) => {
    const newErrors = {};
    if (!buildingValue.trim()) {
      newErrors.building = t("Building is required");
    } else {
      newErrors.building = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.building === '' ? true : false;
  };
  
  const validateUnit = (unitValue) => {
    const newErrors = {};
    if (!unitValue.trim()) {
      newErrors.unit = "Unit is required";
    } if (unitValue.length > 200) {
      newErrors.note = t("Unit should not exceed 10 characters");
    } else {
      newErrors.unit = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.unit === '' ? true : false;
  };

  const validateCityId = (cityIdValue) => {
    const newErrors = {};
    if (!cityIdValue || cityIdValue === "defaultOption") {
        newErrors.cityId = t("City selection is required");
    } else {
        newErrors.cityId = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.cityId === '' ? true : false;
  };
  
  const validateRegion = (regionValue) => {
    const newErrors = {};
    if (!regionValue.trim()) {
      newErrors.region = t("Region is required");
    } else {
      newErrors.region = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.region === '' ? true : false;
  };
  
  const validateNote = (noteValue) => {
    const newErrors = {};
    // You can have custom validation rules for notes if required
    if (noteValue.length > 200) {
      newErrors.note = t("Note should not exceed 200 characters");
    } else {
      newErrors.note = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.note === '' ? true : false;
  };
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    switch (name) {
      case "name":
        validatename(value);
        break;
      case "phone":
        validatePhoneNumber(value);
        break;
      case "street":
        validateStreet(value);
        break;
      case "building":
        validateBuilding(value);
        break;
      case "unit":
        validateUnit(value);
        break;
      case "region":
        validateRegion(value);
        break;
      case "note":
        validateNote(value);
        break;
      case "cityId":
        validateCityId(value);
        break;
      default:
        break;
    }
  };


  function geocodeAddress(formData, callback) {
    const fullAddress = `${formData.street}, ${formData.building}, ${formData.region}, ${formData.unit}`;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ 'address': fullAddress }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
            callback({
                lat: results[0].geometry.location.lat(),
                long: results[0].geometry.location.lng()
            });
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
            callback(null);
        }
    });
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const isnameValid = validatename(formData.name);
    const isPhoneNumberValid = validatePhoneNumber(formData.phone);
    const isStreetValid = validateStreet(formData.street);
    const isBuildingValid = validateBuilding(formData.building);
    const isUnitValid = validateUnit(formData.unit);
    const isRegionValid = validateRegion(formData.region);
    const isNoteValid = validateNote(formData.note);
    const isCityValid = validateCityId(formData.cityId);
    
    if (isnameValid && isPhoneNumberValid && isStreetValid && isBuildingValid && isUnitValid && isRegionValid && isNoteValid && isCityValid) {
      geocodeAddress(formData, (coords) => {
        if(coords) {
            setIsLoading(true);
            setFormData(prevFormData => ({
              ...prevFormData,
              lat: coords.lat,
              long: coords.long
            }));
            updateCustAddress(coords);
        } else {
            setToaster({
              type: "error",
              message: t("Failed to get latitude and longitude"),
              duration: 3000,
            });
        }
      });
    }
  };


  const updateCustAddress = async (cord) => {
    try {
      const addressPayload= formData;
      addressPayload['lat'] = cord.lat;
      addressPayload['long'] = cord.long;      
      addressPayload['id'] = id;      
      const response = await updateAddress(id, addressPayload);
      if (response.succeeded) {
        setToaster({
          type: "success",
          message: 'Address Updated successfully!',
          duration: 3000,
        });
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
        let allErrorMessages = [];
        Object.values(response.errors).forEach((errorArray) => {
            allErrorMessages = allErrorMessages.concat(errorArray);
        });
        let delay = 0;
        allErrorMessages.forEach((errorMessage) => {
        setTimeout(() => {
            setToaster({
                type: "error",
                message: errorMessage,
                duration: 3000,
            });
        }, delay);    
        delay += 500;
      });
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    }
  }

  const handleToasterClose = () => {
    setToaster(null);
  };

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
      {toaster && (
        <Toaster
          type={toaster.type}
          message={toaster.message}
          duration={toaster.duration}
          onClose={handleToasterClose}
        />
      )}
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper inputWrapers newAddressWraper">
              <h4 className="addressHeading">{t("Edit Address")}</h4>
              <div className="addressListings gapTop">
                <div className="indFields">
                  <label className="fieldLabel">{t("Full Name")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Full Name")}
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                  />
                </div>
                {errors.name && (
                    <p className="errorText">{errors.name}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("Phone Number")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Phone Number")}
                    name="phone"
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                </div>
                {errors.phone && (
                    <p className="errorText">{errors.phone}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("street")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Street")}
                    name="street"
                    onChange={handleInputChange}
                    value={formData.street}
                  />
                </div>
                {errors.street && (
                    <p className="errorText">{errors.street}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("building")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Building")}
                    name="building"
                    onChange={handleInputChange}
                    value={formData.building}
                  />
                </div>
                {errors.building && (
                    <p className="errorText">{errors.building}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("unit")}</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Unit")}
                    name="unit"
                    onChange={handleInputChange}
                    value={formData.unit}
                  />
                </div>
                {errors.unit && (
                    <p className="errorText">{errors.unit}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("City")}</label>
                  {isInlineLoading ? (
                     <div className="inlineloader">
                      <Loader
                        showOverlay={false}
                        size={20}
                        color="#B7854C"
                        isLoading={false}
                      />
                     </div> 
                    ) : (
                    <select className="foeldInputs" name="cityId" onChange={handleInputChange}  value={formData.cityId} >
                       <option>{t("Select City")}</option>
                       {allCities?.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                    </select>
                    )}
                </div>
                {errors.cityId && (
                    <p className="errorText">{errors.cityId}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("region")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Region")}
                    name="region"
                    onChange={handleInputChange}
                    value={formData.region}
                  />
                </div>
                {errors.region && (
                    <p className="errorText">{errors.region}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("note")}</label>
                  <textarea
                    className="foeldInputs text-area"
                    placeholder={t("Enter Note")}
                    rows="4"
                    name="note"
                    onChange={handleInputChange}
                    value={formData.note}
                  ></textarea>
                </div>
                {errors.note && (
                    <p className="errorText">{errors.note}</p>
                )}
                <button className="submitInfo" onClick={handleSubmit}>
                    {isLoading ? (
                    <div className="buttonloader">
                      <Loader
                        showOverlay={false}
                        size={12}
                        color="#ffffff"
                        isLoading={true}
                      />
                    </div>                  
                    ) : (
                      t("Submit")
                    )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressEdit;
