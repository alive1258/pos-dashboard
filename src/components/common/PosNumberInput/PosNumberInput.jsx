"use client";
import React from "react";

const NumberInput = ({
  value = "",
  onChange = () => {},
  placeholder,
  className,
  register,
  name,
  errors,
  label,
  required = true, // Default to required if not provided
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers (and empty string)
    if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
      onChange(inputValue); // Update the value
    }
  };

  return (
    <div className="space-y-1 text-[#ADB5BD]">
      {/* Label for input */}
      {label && (
        <label className="text-sm text-white">
          {label}
          <abbr
            className={`${
              register ? "" : "hidden"
            } pl-1 text-lg text-[#FF4234]`}
          >
            *
          </abbr>
        </label>
      )}
      <input
        type="text" // Using type="text" to manually handle number validation
        className={`input_style`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange} // Custom change handler for validation
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern: {
            value: /^[0-9]*$/, // Regex to only allow numbers (empty string is also valid)
            message: "Only numbers are allowed",
          },
        })}
      />
      {errors?.[name] && (
        <span className="text-red-600 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default NumberInput;
