"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de ruta se vuelve al inicio, salvo navegación con anchor
  // (ej. volver desde un caso a /#redes-sociales): ahí se respeta el hash
  // con offset manual del header fijo. Se usa lenis.scrollTo (no
  // window.scrollTo) para que el estado interno de Lenis también se
  // resetee; de lo contrario Lenis reimpone su scroll guardado en el
  // siguiente frame y la página salta.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    const top = target
      ? target.getBoundingClientRect().top + window.scrollY - 80
      : 0;
    if (lenis) {
      lenis.scrollTo(top, { immediate: true, force: true });
    } else {
      window.scrollTo(0, top);
    }
  }, [pathname]);

  return <>{children}</>;
}
