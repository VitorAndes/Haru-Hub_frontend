import { useCallback, useEffect, useState } from "react";

export function useCarousel(totalSlides: number) {
  const SLIDE_INTERVAL = 5000;
  const [current, setCurrent] = useState(0);

  const previousSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (totalSlides === 0) return;

    const timeout = setTimeout(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => clearTimeout(timeout);
  }, [totalSlides, current, nextSlide]);

  return {
    current,
    previousSlide,
    nextSlide,
    goToSlide,
  };
}
