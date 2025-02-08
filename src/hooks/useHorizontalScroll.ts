import { RefObject, useCallback, useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

const TWO = 2;

const updateGradientVisibility = (
  element: RefObject<HTMLDivElement>,
  condition: boolean
): void => {
  if (element.current) {
    element.current.style.display = condition ? 'block' : 'none';
  }
};

export const useHorizontalScroll = (): {
  containerRef: RefObject<HTMLDivElement>;
  firstGradient: RefObject<HTMLDivElement>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  lastGradient: RefObject<HTMLDivElement>;
  scrollToElement: (element: HTMLElement) => void;
} => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstGradient = useRef<HTMLDivElement>(null);
  const lastGradient = useRef<HTMLDivElement>(null);

  const getScrollLeft = (container: HTMLElement): number => {
    return container.dir === 'rtl'
      ? container.scrollWidth - container.clientWidth - container.scrollLeft
      : container.scrollLeft;
  };

  const setScrollLeft = (container: HTMLElement, value: number): void => {
    if (container.dir === 'rtl') {
      container.scrollLeft = container.scrollWidth - container.clientWidth - value;
    } else {
      container.scrollLeft = value;
    }
  };

  const updateScrollStatus = useCallback(() => {
    const container = containerRef.current;

    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const hasMoreOnLeft = getScrollLeft(container) > 0;
      const hasMoreOnRight = getScrollLeft(container) < maxScrollLeft;

      updateGradientVisibility(firstGradient, hasMoreOnLeft);
      updateGradientVisibility(lastGradient, hasMoreOnRight);
    }
  }, []);

  const scrollHorizontally = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const scrollAmount = e.deltaY;
      const container = containerRef.current;

      if (container) {
        const currentScrollLeft = getScrollLeft(container);
        const newScrollPosition = currentScrollLeft + scrollAmount;

        gsap.to(container, {
          duration: 0.5,
          ease: 'power3.out',
          onComplete: updateScrollStatus,
          scrollTo: { x: newScrollPosition },
          onUpdate: () => setScrollLeft(container, newScrollPosition),
        });
      }
    },
    [updateScrollStatus]
  );

  const handleMouseEnter = useCallback(() => {
    window.addEventListener('wheel', scrollHorizontally, { passive: false });
  }, [scrollHorizontally]);

  const handleMouseLeave = useCallback(() => {
    window.removeEventListener('wheel', scrollHorizontally);
  }, [scrollHorizontally]);

  const scrollToElement = useCallback(
    (element: HTMLElement) => {
      const container = containerRef.current;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const offset = elementRect.left - containerRect.left;

        const newScrollPosition =
          getScrollLeft(container) +
          offset -
          container.clientWidth / TWO +
          elementRect.width / TWO;

        gsap.to(container, {
          duration: 0.6,
          ease: 'power3.out',
          onComplete: updateScrollStatus,
          scrollTo: { x: newScrollPosition },
          onUpdate: () => setScrollLeft(container, newScrollPosition),
        });
      }
    },
    [updateScrollStatus]
  );

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const observer = new MutationObserver(updateScrollStatus);
      observer.observe(container, { childList: true, subtree: true });

      updateScrollStatus();

      return (): void => {
        observer.disconnect();
      };
    }
  }, [containerRef, updateScrollStatus]);

  return {
    containerRef,
    firstGradient,
    lastGradient,
    handleMouseEnter,
    handleMouseLeave,
    scrollToElement,
  };
};
