import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import editIcon from "../../assets/images/edit-circle.png";
import deleteIcon from "../../assets/images/delete-circle.png";
import saudi from "../../assets/images/saudi-arabia-2.png";
import { useTranslation } from "react-i18next";
import { getAllCustomerAddress } from "../../api/customer";
import Loader from "../../components/common/Loader/Loader";
import { deleteCustomerAddress } from "../../api/customer";

const AddressList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [deletingAddresses, setDeletingAddresses] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    customerAddresses();
  }, []);

  const customerAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCustomerAddress();
      if (response) {
        setIsLoading(false);
        setAddresses(response)
      }
    } catch (error) {
      console.error("Error fetching saved address:", error);
    }
  };

  const handleAddressEdit = (e, address) => {
    e.preventDefault();
    navigate(`/profile/edit-address/${address.id}`, { state: { data: address } });
  };
  
  
  const handleAddressDelete = async (e,index,address) => {
    e.preventDefault();
    setDeletingAddresses(prev => new Set([...prev, address.id]));
    try {
      const response = await deleteCustomerAddress(address.id);
      if (response) {
        const updatedAddress = [...addresses.slice(0, index), ...addresses.slice(index + 1)];
        setAddresses(updatedAddress);
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    } finally {
      setDeletingAddresses(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(address.id);
        return newSet;
      });
    }
  }

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper">
              <h4 className="addressHeading">{t("Address Book")}</h4>
              <div className="addressListings">
                <p className="addAddress">
                  <Link to="/profile/address-add" className="profileLinksTag">
                    + {t("Add New Address")}
                  </Link>
                </p>
                {isLoading ? (
                  <Loader
                    showOverlay={false}
                    size={25}
                    color="#B7854C"
                    isLoading={false}
                  />
                ) : (
                  addresses.length === 0 ? (
                    <p className="noRecords">
                      {t("You don’t have saved address yet")}
                    </p>
                  ) : (
                    addresses.map((address,index) => (  
                      <div className="indAddressList">
                        <h5 className="addName">{address.name}</h5>
                        <p className="addpara">{address.street}, {address.building}, {address.region}, {address.unit}</p>
                        <p className="saudiWraper">
                          <img src={saudi} className="sausiIcon" alt="" />
                          <span className="phoneNumbers">
                            <b>+</b> {address.phone}
                          </span>
                        </p>
                        <span className="editAddress">
                          <span className="editAdd">
                            <Link onClick={(e) => handleAddressEdit(e,address)}><img src={editIcon} alt="" /></Link>
                          </span>
                          <span className="deleteAdd" onClick={(e) => handleAddressDelete(e,index,address)}>
                            <img src={deleteIcon} alt="" />
                            {deletingAddresses.has(address.id) && (
                              <Loader
                                showOverlay={false}
                                size={10}
                                color="#000"
                                isLoading={false}
                              />
                            )}
                          </span>
                        </span>
                      </div>
                    ))
                  )
              )}
              </div>
            </div>

            <div className="questionsWrapers">
              <h3>{t("We want to get to know you")}</h3>
              <button className="qusBtn">{t("Answer Questionnaire")}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressList;
