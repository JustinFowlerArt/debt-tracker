import React from "react";

const SelectInput = ({ name, onChange, defaultOption, value, options }) => {
    return (
        // Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="py-0 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
        >
            <option value="">{defaultOption}</option>
            {options.map((option) => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectInput;
