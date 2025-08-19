import { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-black px-3 py-1 text-xs whitespace-nowrap text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
