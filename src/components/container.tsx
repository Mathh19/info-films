import React from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { useTouchScroll } from "../hooks/useTouchScroll";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { containerRef, handleMouseEnter, handleMouseLeave } =
    useHorizontalScroll();
  useTouchScroll(containerRef);

  const scrollAmount = 300;

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex w-full items-center">
      <button
        onClick={handleScrollLeft}
        className="absolute z-[1] hidden cursor-pointer rounded-full border border-cyan-400 bg-black/50 p-2 text-cyan-400 drop-shadow transition-all duration-300 hover:bg-black/90 focus:bg-black/90 max-lg:block"
      >
        <ArrowLeft />
      </button>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-9 overflow-x-hidden overflow-y-hidden px-1.5 py-4"
      >
        {children}
      </div>
      <button
        onClick={handleScrollRight}
        className="absolute right-0 z-[1] hidden cursor-pointer rounded-full border border-cyan-400 bg-black/50 p-2 text-cyan-400 drop-shadow transition-all duration-300 hover:bg-black/90 focus:bg-black/90 max-lg:block"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
