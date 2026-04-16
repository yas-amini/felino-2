import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const selectors = [
        ".admin-page",
        ".admin-layout",
        ".admin-main",
        ".site-layout",
        "main",
      ];

      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el instanceof HTMLElement) {
          el.scrollTop = 0;
          el.scrollTo?.(0, 0);
        }
      }
    };

    resetScroll();

    const raf1 = requestAnimationFrame(() => {
      resetScroll();

      const raf2 = requestAnimationFrame(() => {
        resetScroll();
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
}