export const Spinner = ({ size = 6, color = "#e2e" }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4`}
      style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    />
  );
};
