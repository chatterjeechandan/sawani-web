import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import arrows from "../../../assets/images/arrowPoint.png";
import { useTranslation } from "react-i18next";
import dropimg from "../../../assets/images/drop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DialogSelect = ({
  options,
  selectedOption,
  onSelect,
  buttonText,
  imgSrc,
  fieldTitle,
}) => {
  const [open, setOpen] = useState(false);
  const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef();

  const handleChange = (value) => {
    setTempSelectedOption(value);
    setDropDownOpen(false);
    onSelect(value);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const setDropDownOpenFn = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const getDropdownText = (selection) => {
    if (!selection) {
      return fieldTitle;
    } else {
      if (typeof selection === "string") {
        const selectionObj = JSON.parse(selection);
        return selectionObj.name;
      } else {
        return selection.name;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOpen(false);
    }
  };

  return (
    <div>
      <div className="paymentLinkWraper" onClick={handleClickOpen}>
        <span className="paymentIcons">
          <img src={imgSrc} alt="" />
        </span>
        <span className="paymentname">
          {buttonText || `${t("Select")} ${fieldTitle}`}
        </span>
        <span className="arrowRight">
          <img src={arrows} alt="" />
        </span>
      </div>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "90%",
          width: "90vw",
          maxHeight: "90%",
          height: "90vh",
        }}
      >
        <DialogTitle>{`${t("Choose")} ${fieldTitle}`}</DialogTitle>
        <button className="closeBtn" type="button" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <DialogContent sx={{ maxWidth: "lg", width: "60vw" }}>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
          >
            <div className="dropdown sort-drop cust-drop" ref={dropdownRef}>
              <div
                className="customizeFilterDisplay"
                onClick={() => setDropDownOpenFn(!dropDownOpen)}
              >
                <span className="selectText">
                  {getDropdownText(tempSelectedOption)}
                </span>
                <span className="dropImages">
                  <img src={dropimg} alt="arrow" />
                </span>
              </div>
              {dropDownOpen && (
                <ul className="customDropdown">
                  {options?.map((option) => (
                    <li
                      key={option.id}
                      onClick={(e) => handleChange(JSON.stringify(option))}
                    >
                      <span className="selectText">{option.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { DialogSelect };
