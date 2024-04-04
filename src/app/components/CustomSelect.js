import React, { useState } from 'react';
import styles from './CustomSelect.css'; // Import your CSS file for styling

const CustomSelect = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleSelect = (option) => {
        const newValue = value.includes(option.value)
            ? value.filter((val) => val !== option.value)
            : [...value, option.value];
        onChange(newValue);
    };

    const isSelected = (option) => value.includes(option.value);

    return (
        <div className={styles.customSelect}>
            <input
                type="text"
                value={value.map((val) => options.find((option) => option.value === val)?.label).join(', ')}
                placeholder="Select an option"
                className={styles.selectedOption}
                onClick={toggleOpen}
                readOnly
            />
            {open && (
                <div className={styles.optionList}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`${styles.option} ${isSelected(option) && styles.selected}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default CustomSelect;