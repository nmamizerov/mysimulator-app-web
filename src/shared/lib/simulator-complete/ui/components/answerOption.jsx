import { useEffect, useState } from "react";
import { darkenColor } from "../../lib/darkenColor";
import { Spinner } from "@/shared/ui/spinner";
import clsx from "clsx";

export const AnswerOption = ({
  text,
  onClick,
  customization,
  isLoading,
  isDisabled,
}) => {
  const [optionStyle, setOptionStyle] = useState({
    color: customization.color,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setOptionStyle({
        color: darkenColor(customization.color, 10),
      });
    }
    if (isActive) {
      setOptionStyle({
        color: darkenColor(customization.color, 20),
      });
    }
    if (!isHovered && !isActive) {
      setOptionStyle({
        color: customization.color,
      });
    }
  }, [isHovered, isActive, customization]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        color: optionStyle.color,
        borderColor: optionStyle.color,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
      className="relative cursor-pointer rounded-lg border-[1px] px-5 py-2 text-center"
    >
      {isLoading && (
        <span className="absolute left-[calc(50%-12px)]">
          <Spinner color={customization.color} />
        </span>
      )}
      <span className={clsx(isLoading && "opacity-0")}>{text}</span>
    </div>
  );
};
