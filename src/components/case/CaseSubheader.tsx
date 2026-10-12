"use client";

import { useEffect, useState } from "react";

// Subheader de la vista social: anchors numerados por sección, sticky bajo
// el header primario con hairline superior (sin borde inferior).
export interface CaseSubheaderLink {
  id: string;
  label: string;
}

export default function CaseSubheader({
  links,
}: {
  links: CaseSubheaderLink[];
}) {
  const [active, setActive] = useState(links[0]?.id ?? "");

  useEffect(() => {
    if (links.length === 0) return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      // Banda central del viewport, igual que el Header con NAV_ITEMS.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const sec of sections) observer.observe(sec);
    return () => observer.disconnect();
  }, [links]);

  if (links.length === 0) return null;

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <div className="sticky top-16 z-20 mt-12 -mx-6 border-t border-border/60 bg-background/85 px-6 backdrop-blur-md sm:-mx-8 sm:px-8 md:mx-0 md:px-0">
      <nav
        aria-label="Secciones"
        className="flex snap-x snap-mandatory items-center justify-start gap-6 overflow-x-auto scroll-smooth py-6 md:justify-center md:overflow-visible"
      >
        {links.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={handleClick(link.id)}
            aria-current={active === link.id ? "true" : undefined}
            className={`shrink-0 snap-start whitespace-nowrap font-mono text-xs tracking-widest ${
              active === link.id ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
