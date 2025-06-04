"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  text,
  placeholder,
  register,
  errors,
  pattern,
  value,
  validate,
  onChange,
  readOnly = false,
  required = true, // Updated prop name
}) => {
  const [inputType, setInputType] = useState(type);
  const [showPass, setShowPass] = useState(false);

  const handleShowPassword = (type) => {
    setShowPass(!showPass);
    setInputType(type);
  };

  // Handle the input change
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Switch to "number" input type if the value is a valid number or starts with a minus sign
    if (/^[+-]?\d*\.?\d+$/.test(inputValue) || inputValue === "") {
      setInputType("number"); // Allow number type input
      onChange(inputValue); // Update the value
    } else {
      setInputType("text"); // If it's not a valid number, switch to text type
      onChange(inputValue); // Update the value
    }
  };

  return (
    <div className="space-y-1">
      {/* Input label */}
      <label className="text-[15px] text-[#b5b7c8] ">
        <span>{label}</span>
        <abbr
          className={`${
            required ? "" : " opacity-0"
          } pl-1 text-lg  text-[#FF4234]`}
        >
          *
        </abbr>
      </label>

      {/* Input */}
      <div className="relative">
        <input
          className={`input_style w-full`}
          type={inputType}
          value={value}
          readOnly={readOnly}
          onChange={handleChange} // Use the change handler that dynamically updates the type
          autoComplete="off"
          placeholder={placeholder}
          {...(register
            ? register(text, {
                required: required ? `${label} is required` : false,
                pattern: pattern,
                validate: validate,
              })
            : {})}
        />

        {/* For password visibility toggle */}
        {type === "password" &&
          (showPass ? (
            <FaEye
              onClick={() => handleShowPassword("password")}
              className="text-[#787F90] absolute right-3 top-0  mt-3.5 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => handleShowPassword("text")}
              className="text-[#787F90] absolute right-3 top-0 mt-3.5  cursor-pointer"
            />
          ))}
      </div>

      {/* Error message */}
      <div className="h-[10px]">
        {errors?.[text] && (
          <p role="alert" className="text-danger-base text-xs">
            {errors[text]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
