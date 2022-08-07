export const isClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  event: MouseEvent
) => ref.current && !ref.current.contains(event.target as Node);
