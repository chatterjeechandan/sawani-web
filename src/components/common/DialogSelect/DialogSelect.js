import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import arrows from "../../../assets/images/arrowPoint.png";
import { useTranslation } from "react-i18next";
import dropimg from "../../../assets/images/drop.png";


const DialogSelect = ({ options, selectedOption, onSelect, buttonText, imgSrc, fieldTitle }) => {
    const [open, setOpen] = useState(false);
    const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef();

    const handleChange = (value) => {
        setTempSelectedOption(value);
        setDropDownOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOk = () => {
        // Update the main state with the selected option
        onSelect(tempSelectedOption);
        handleClose();
    };

    const getDropdownText = (selection) => {
        if(!selection) {
            return fieldTitle;
        }
        else {
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
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} sx={{ maxWidth: '90%', width: '90vw', maxHeight: '90%', height: '90vh' }}>
                <DialogTitle>{`${t("Choose")} ${fieldTitle}`}</DialogTitle>
                <DialogContent sx={{ maxWidth: 'lg', width: '60vw' }}>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                        <div className="dropdown sort-drop cust-drop" ref={dropdownRef}>
                            <div className="customizeFilterDisplay" onClick={() => setDropDownOpenFn(!dropDownOpen)}>
                            <span className="selectText">{getDropdownText(tempSelectedOption)}</span>
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
                <DialogActions>
                    <Button onClick={handleClose}>{t("CANCEL")}</Button>
                    <Button onClick={handleOk}>{t("OK")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { DialogSelect };
