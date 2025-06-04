import React, { useState } from "react";

const Tooltip = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`input_style absolute z-50 max-w-xs  w-max px-3 py-2 text-sm text-[#b5b7c8] bg-black rounded shadow-lg transition-opacity duration-200 whitespace-normal break-words ${positionClasses[position]}`}
          style={{ wordWrap: "break-word" }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
