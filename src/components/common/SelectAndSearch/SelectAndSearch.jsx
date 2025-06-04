import React, { useEffect, useRef, useState } from "react";

const SelectAndSearch = ({
  options,
  type_id,
  type_name,
  setValue,
  required = true,
  register,
  message,
  errors,
  placeholder,
  setSelectedOption,
  selectStatus = false,
  label,
  setBalance,
}) => {
  const [selectValue, setSelectValue] = useState(null);
  const [active, setActive] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState("down"); // Default to down
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleClick = (option) => {
    setSelectValue(option);
    if (selectStatus) {
      setSelectedOption(option);
    }
    if (option?.balance) {
      setBalance(option?.balance);
    }
    setActive(false);
    setSearchQuery("");
  };

  // Update form values, ensuring no unnecessary re-renders
  useEffect(() => {
    if (selectValue?.id || selectValue?.name) {
      setValue(type_id, selectValue?.id || null);
      setValue(type_name, selectValue?.name || "");
    }
  }, [selectValue, setValue, type_id, type_name]);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Calculate dropdown position dynamically
  const handleDropdownPosition = () => {
    const inputRect = inputRef.current?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    // Show above if there's less space below
    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDropdownPosition("up");
    } else {
      setDropdownPosition("down");
    }
  };

  // Clear the selected value
  const handleClear = () => {
    setSelectValue(null);
    setSearchQuery("");
  };
  // i add extra for discoun tye er work
  // useEffect(() => {
  //   if (selectStatus && selectValue) {
  //     setSelectedOption(selectValue); // Sync with parent when updated
  //   }
  // }, [selectValue, selectStatus, setSelectedOption]);

  // Filter options
  useEffect(() => {
    if (searchQuery) {
      const filtered = options?.filter((option) => {
        const nameMatch = option?.name
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const numberMatch = option?.number?.toString().includes(searchQuery);
        return nameMatch || numberMatch;
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options]);

  return (
    <div>
      <div ref={dropdownRef} className="pt-1">
        <div className="relative w-full space-y-[1px]">
          <div>
            {label && (
              <label className="text-[15px] text-[#b5b7c8]">
                {label}
                <abbr
                  className={`${
                    required ? "" : "hidden"
                  } pl-1   text-[#FF4234]`}
                >
                  *
                </abbr>
              </label>
            )}
          </div>
          <div
            className="w-full  px-4 h-[46px] bg-[#19191F] text-[#787F90] border border-[#26272F] rounded-md flex items-center justify-between cursor-pointer"
            tabIndex="0"
            ref={inputRef}
            onClick={() => {
              setActive(!active);
              handleDropdownPosition(); // Check position when clicked
            }}
          >
            <input
              type="text"
              autoComplete="off"
              className="flex-grow bg-[#19191F] text-[#b5b7c8] placeholder:text-[#787F90] text-[14px] cursor-pointer  focus:outline-none h-10 py-1 w-full"
              {...register(type_name, { required })}
              placeholder={placeholder}
              onChange={(e) => {
                setSearchQuery(e.target.value), setActive(true);
              }}
            />
            {(selectValue?.name || searchQuery) && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-base font-medium text-white/70 cursor-pointer pr-1"
              >
                ×
              </div>
            )}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66669 1.33334L5.00002 4.66667L8.33335 1.33334"
                stroke="#787F90"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            {active && (
              <div
                className={`absolute left-0 m-0 p-0  max-h-[220px] sidebarScroll overflow-y-auto rounded-lg w-full z-50 bg-[#19191f] border border-[#26272F] ${
                  dropdownPosition === "up"
                    ? "bottom-[calc(100%+0px)]"
                    : "top-[calc(100%+0px)]"
                }`}
              >
                {filteredOptions?.length > 0 ? (
                  <ul>
                    {filteredOptions?.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleClick(option)}
                        className="cursor-pointer text-[14px]  hover:bg-[#3383F9] text-[#787F90] hover:text-[#fff] px-3 py-1 capitalize"
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="text-center px-3 py-4 opacity-70">
                    No Options Found
                  </h1>
                )}
              </div>
            )}
          </div>
          <div className="text-xs text-danger h-[10px]">
            {errors?.[type_name] && (
              <p role="alert" className="text-danger-base text-xs">
                {message || "This field is required"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAndSearch;
