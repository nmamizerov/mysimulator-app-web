import clsx from "clsx";

export const Chip = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={clsx(
        "px-3 py-1 cursor-pointer rounded-lg border border-gray-300 text-gray-900 hover:border-primary hover:bg-primary hover:text-white transition-colors",
        active && "bg-primary text-white border-primary"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
