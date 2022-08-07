export const getCoordinates = (div: HTMLDivElement) => {
  const rect = div.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
};
