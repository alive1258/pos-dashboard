"use client";

import { useState } from "react";
import { GrAttachment } from "react-icons/gr";

const FileInput = ({
  label,
  text,
  register,
  errors,
  pattern,
  validate,
  setValue,
  placeholder,
  required = true,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setValue(text, event.target.files[0]);
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setValue(text, null);
  };

  return (
    <div className="">
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

        {/* Input file */}
        <div className="relative border border-[#26272F] focus:border focus:border-[#26272F] bg-[#19191F] px-2 py-2 rounded-lg">
          <label className="text-sm text-gray-400">
            {selectedFile
              ? selectedFile.name?.slice(0, 25)
              : placeholder || "Choose File"}
            <input
              {...(register
                ? register(text, {
                    required: required ? `${label} is required` : false,
                    pattern: pattern,
                    validate: validate,
                  })
                : {})}
              type="file"
              accept="image/jpg,image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={handleFileChange}
            />
            {/* action button  */}
            <div className="absolute right-1 top-1 bg-[#0b0c1071] p-2 rounded-full">
              {selectedFile ? (
                <></>
              ) : (
                <GrAttachment className="text-sm cursor-pointer z-40 md:text-base text-primary-muted" />
              )}
            </div>
          </label>
          <div
            className={`absolute right-1 top-1 ${
              selectedFile && "bg-[#0b0c1071]"
            }  p-2 rounded-full`}
          >
            {selectedFile && (
              <div onClick={handleFileDelete} className="cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6.66732 3.99998H9.33398C9.33398 3.64636 9.19351 3.30722 8.94346 3.05717C8.69341 2.80712 8.35427 2.66665 8.00065 2.66665C7.64703 2.66665 7.30789 2.80712 7.05784 3.05717C6.80779 3.30722 6.66732 3.64636 6.66732 3.99998ZM5.33398 3.99998C5.33398 3.29274 5.61494 2.61446 6.11503 2.11436C6.61513 1.61426 7.29341 1.33331 8.00065 1.33331C8.70789 1.33331 9.38617 1.61426 9.88627 2.11436C10.3864 2.61446 10.6673 3.29274 10.6673 3.99998H14.0007C14.1775 3.99998 14.347 4.07022 14.4721 4.19524C14.5971 4.32027 14.6673 4.48984 14.6673 4.66665C14.6673 4.84346 14.5971 5.01303 14.4721 5.13805C14.347 5.26307 14.1775 5.33331 14.0007 5.33331H13.4127L12.822 12.2266C12.7652 12.8923 12.4606 13.5124 11.9686 13.9642C11.4765 14.416 10.8327 14.6667 10.1647 14.6666H5.83665C5.16859 14.6667 4.52483 14.416 4.03275 13.9642C3.54067 13.5124 3.2361 12.8923 3.17932 12.2266L2.58865 5.33331H2.00065C1.82384 5.33331 1.65427 5.26307 1.52925 5.13805C1.40422 5.01303 1.33398 4.84346 1.33398 4.66665C1.33398 4.48984 1.40422 4.32027 1.52925 4.19524C1.65427 4.07022 1.82384 3.99998 2.00065 3.99998H5.33398ZM10.0007 7.99998C10.0007 7.82317 9.93041 7.6536 9.80539 7.52857C9.68036 7.40355 9.51079 7.33331 9.33398 7.33331C9.15717 7.33331 8.9876 7.40355 8.86258 7.52857C8.73756 7.6536 8.66732 7.82317 8.66732 7.99998V10.6666C8.66732 10.8435 8.73756 11.013 8.86258 11.1381C8.9876 11.2631 9.15717 11.3333 9.33398 11.3333C9.51079 11.3333 9.68036 11.2631 9.80539 11.1381C9.93041 11.013 10.0007 10.8435 10.0007 10.6666V7.99998ZM6.66732 7.33331C6.84413 7.33331 7.0137 7.40355 7.13872 7.52857C7.26375 7.6536 7.33398 7.82317 7.33398 7.99998V10.6666C7.33398 10.8435 7.26375 11.013 7.13872 11.1381C7.0137 11.2631 6.84413 11.3333 6.66732 11.3333C6.49051 11.3333 6.32094 11.2631 6.19591 11.1381C6.07089 11.013 6.00065 10.8435 6.00065 10.6666V7.99998C6.00065 7.82317 6.07089 7.6536 6.19591 7.52857C6.32094 7.40355 6.49051 7.33331 6.66732 7.33331ZM4.50732 12.1133C4.53572 12.4462 4.6881 12.7564 4.93428 12.9823C5.18046 13.2083 5.50251 13.3335 5.83665 13.3333H10.1647C10.4986 13.3332 10.8203 13.2078 11.0662 12.9819C11.3121 12.756 11.4643 12.446 11.4927 12.1133L12.074 5.33331H3.92732L4.50732 12.1133Z"
                    fill="#FB5454"
                  />
                </svg>
              </div>
            )}
          </div>
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
    </div>
  );
};

export default FileInput;
