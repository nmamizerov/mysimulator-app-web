import clsx from "clsx";
export const Card = ({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "sm";
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-[20px] p-4",
        size === "md" && "rounded-[20px]",
        size === "sm" && "rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
};
