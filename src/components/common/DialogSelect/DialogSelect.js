import React, { useState } from 'react';
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

const DialogSelect = ({ options, selectedOption, onSelect, buttonText, imgSrc, fieldTitle }) => {
    const [open, setOpen] = useState(false);
    const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);
    const { t } = useTranslation();
    const handleChange = (event) => {
        setTempSelectedOption(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
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
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>{`${t("Choose")} ${fieldTitle}`}</DialogTitle>
                <DialogContent sx={{ maxWidth: 'lg', width: '30vw' }}>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                        <FormControl sx={{ width: '30vw' }}>
                            <InputLabel htmlFor="demo-dialog-native">{fieldTitle}</InputLabel>
                            <Select
                                native
                                value={tempSelectedOption}
                                onChange={handleChange}
                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                {options?.map((option) => (
                                    <option key={option.id} value={JSON.stringify(option)}>
                                        {option.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("Cancel")}</Button>
                    <Button onClick={handleOk}>{t("Ok")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { DialogSelect };
