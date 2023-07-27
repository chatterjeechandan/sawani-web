import React from 'react';
import './RadioButtonsWithImages.css'

const RadioButtonsWithImages = ({ options, selectedOption, onChange, imageUrls }) => {

    return (
        <div>
            {options?.map((option, index) => (
                <label key={option.id}>
                    <input
                        type="radio"
                        value={option.id}
                        checked={Number(selectedOption) === Number(option.id)}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <img src={imageUrls[index]} alt={option} />
                </label>
            ))}
        </div>
    );
};

export default RadioButtonsWithImages;
