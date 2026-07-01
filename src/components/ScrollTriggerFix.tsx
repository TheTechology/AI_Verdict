"use client";

import { useEffect } from "react";

/**
 * Framer Motion whileInView poate evalua intersecția înainte ca fonturile/layout-ul
 * să se stabilizeze la primul paint, și rămâne "blocat" pe opacity:0 până la un
 * eveniment care forțează recalcularea IntersectionObserver-ului. Simulăm acel
 * eveniment o singură dată, imediat după montare.
 */
export function ScrollTriggerFix() {
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("scroll")), 150);
    return () => clearTimeout(id);
  }, []);

  return null;
}
