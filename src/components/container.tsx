import React from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { useTouchScroll } from "../hooks/useTouchScroll";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { containerRef, handleMouseEnter, handleMouseLeave } =
    useHorizontalScroll();
  useTouchScroll(containerRef);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex gap-9 overflow-x-hidden overflow-y-hidden px-1.5 py-4"
    >
      {children}
    </div>
  );
};
