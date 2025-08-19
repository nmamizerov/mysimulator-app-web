import { useEffect, useState } from "react";
import { darkenColor } from "../../lib/darkenColor";
import clsx from "clsx";
import { Spinner } from "@/shared/ui/spinner";

export const ColoredButton = ({
  onClick,
  content,
  isLoading,
  customization,
  icon,
  className,
  type = "button",
}) => {
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: customization.buttonBackgroundColor,
    color: customization.buttonTextColor,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setButtonStyle({
        color: customization.buttonTextColor,
        backgroundColor: darkenColor(customization.buttonBackgroundColor, 5),
      });
    }
    if (isActive) {
      setButtonStyle({
        color: customization.buttonTextColor,
        backgroundColor: darkenColor(customization.buttonBackgroundColor, 10),
      });
    }
    if (!isHovered && !isActive) {
      setButtonStyle({
        color: customization.buttonTextColor,
        backgroundColor: customization.buttonBackgroundColor,
      });
    }
  }, [isHovered, isActive, customization]);

  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        color: buttonStyle.color,
        backgroundColor: buttonStyle.backgroundColor,
        pointerEvents: isLoading ? "none" : "auto",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      className={clsx(
        "relative cursor-pointer rounded-lg font-semibold text-white transition-colors",
        icon ? "px-2 py-2" : "px-5 py-2",
        className,
      )}
    >
      {isLoading && (
        <span className="absolute left-[calc(50%-12px)]">
          <Spinner color={buttonStyle.color} />
        </span>
      )}
      <span className={clsx(isLoading && "opacity-0")}>{content}</span>
    </button>
  );
};
