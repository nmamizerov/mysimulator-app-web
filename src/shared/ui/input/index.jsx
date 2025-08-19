import clsx from "clsx";

export const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  error,
  tip,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-lg border px-4 py-2 transition-all focus:outline-none",
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-gray-300 focus:ring-2 focus:ring-blue-400",
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {tip && !error && <p className="mt-1 text-sm text-gray-500">{tip}</p>}
    </div>
  );
};
