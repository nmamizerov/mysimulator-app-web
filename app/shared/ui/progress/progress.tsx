import clsx from "clsx";

export const Progress = ({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) => {
  return (
    <div
      className={clsx("w-full h-[6px] bg-secondary rounded-full", className)}
    >
      <div
        className="h-full bg-primary rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
