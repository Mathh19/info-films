import { RefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

export const useTouchScroll = (containerRef: RefObject<HTMLDivElement>) => {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const scrollStartX = useRef(0);
  const isDragging = useRef(false);

  const getScrollLeft = (container: HTMLElement): number => container.scrollLeft;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      scrollStartX.current = getScrollLeft(container);
      isDragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;

      const touchDeltaX = touchStartX.current - e.touches[0].clientX;
      const touchDeltaY = touchStartY.current - e.touches[0].clientY;

      const isHorizontalMove = Math.abs(touchDeltaX) > Math.abs(touchDeltaY);

      if (isHorizontalMove) {
        e.preventDefault();
        const newScrollPosition = scrollStartX.current + touchDeltaX;

        gsap.to(container, {
          duration: 0.2,
          ease: "power3.out",
          scrollTo: { x: newScrollPosition },
        });
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [containerRef]);
};
