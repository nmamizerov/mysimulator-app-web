export const darkenColor = (color, percent) => {
  if (!color) return null;
  const num = parseInt(color.replace("#", ""), 16);
  const r = (num >> 16) - Math.round((percent / 100) * 255);
  const g = ((num >> 8) & 0x00ff) - Math.round((percent / 100) * 255);
  const b = (num & 0x0000ff) - Math.round((percent / 100) * 255);
  return `#${(
    0x1000000 +
    (r < 0 ? 0 : r > 255 ? 255 : r) * 0x10000 +
    (g < 0 ? 0 : g > 255 ? 255 : g) * 0x100 +
    (b < 0 ? 0 : b > 255 ? 255 : b)
  )
    .toString(16)
    .slice(1)}`;
};
