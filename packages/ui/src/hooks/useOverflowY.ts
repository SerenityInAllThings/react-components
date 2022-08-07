import React, { useLayoutEffect, useRef, useState } from 'react';
import { getCoordinates } from '../utils/getCoordinates';

interface OverflowY {
  ref: React.RefObject<HTMLDivElement>;
  isOverflowY: boolean;
}

export const useOverflowY = (
  callback?: (hasOverflow: boolean) => void
): OverflowY => {
  const [isOverflowY, setIsOverflowY] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current } = ref;
    if (!current) return;
    const { y } = getCoordinates(current);
    const hasOverflowY = current.clientHeight + y > window.innerHeight;
    setIsOverflowY(hasOverflowY);
    callback?.(hasOverflowY);
  }, [callback, ref]);

  return { ref, isOverflowY };
};
