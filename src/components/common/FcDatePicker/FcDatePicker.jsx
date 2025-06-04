import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai"; // Calendar Icon

const FcDatePicker = ({
  label,
  placeholder,
  text,
  register,
  setValue,
  required = true,
  message,
  defaultValue,
  errors,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue(text, date, { shouldValidate: true }); // Set the value for react-hook-form
  };

  // Custom Header for Month and Year Selection
  const CustomHeader = ({ date, changeMonth, changeYear }) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className="flex justify-between items-center gap-1 px-1  py-2">
        <button
          type="button"
          onClick={() => changeMonth(date.getMonth() - 1)}
          className="px-2 py-1 rounded-md text-black-base hover:bg-blue-100"
        >
          &#60;
        </button>
        <div className="flex items-center w-full justify-between gap-2">
          <select
            value={date.getFullYear()}
            onChange={(e) => changeYear(parseInt(e.target.value))}
            className="border border-info-base w-[90px] outline-blue-400 rounded-md p-1 custom-scrollbar"
          >
            {Array.from({ length: 80 }, (_, index) => 1970 + index).map(
              (yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              )
            )}
          </select>
          <select
            value={date.getMonth()}
            onChange={(e) => changeMonth(parseInt(e.target.value))}
            className="border border-info-base outline-blue-400 rounded-md p-1"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => changeMonth(date.getMonth() + 1)}
          className="px-2 py-1 rounded-md text-black-base hover:bg-blue-100"
        >
          &#62;
        </button>
      </div>
    );
  };

  // Register the field with react-hook-form on mount
  useEffect(() => {
    if (register) {
      register(text, {
        required: required
          ? message
            ? message
            : "This field is required"
          : false,
        validate: (value) => value !== null || "Please select a date",
      });
    }

    if (defaultValue) {
      setValue(text, defaultValue, { shouldValidate: true });
      setSelectedDate(new Date(defaultValue));
    }
  }, [register, text, required, message, defaultValue, setValue]);

  return (
    <div className="">
      <div className="relative space-y-[3px] text-sm w-full">
        <label className="text-[15px] text-[#b5b7c8]">
          {label}
          <abbr
            className={`pl-1 ${
              required ? "" : "opacity-0"
            } text-lg text-[#FF4234]`}
          >
            *
          </abbr>
        </label>
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd-MM-yyyy h:mm aa"
            timeFormat="HH:mm"
            timeIntervals={15}
            className="input_style py-2.5"
            placeholderText={placeholder}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
          />
          <AiOutlineCalendar
            className="absolute top-3 right-3 text-gray-500"
            size={18}
          />
        </div>
        {/* Error message */}
        <div className="h-[10px]">
          {errors?.[text] && (
            <p role="alert" className="text-danger-base text-xs">
              {errors[text].message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FcDatePicker;
