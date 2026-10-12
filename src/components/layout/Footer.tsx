import { PAGE_PADDING_X } from "@/lib/constants";
import { SOCIAL_LINKS } from "@/data/site";
import { BehanceIcon, FacebookIcon, InstagramIcon } from "./SocialIcons";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Behance: BehanceIcon,
} as const;

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Ola invertida: parte superior del footer. El recorte muestra el
          fondo de la página y el cuerpo queda del color opuesto al tema. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-16 w-full bg-background md:h-24"
      >
        <path
          d="M0,120 V80 C240,20 480,20 720,70 C960,120 1200,120 1440,60 V120 Z"
          className="fill-foreground"
        />
      </svg>
      <div className={`py-12 md:py-16 ${PAGE_PADDING_X}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="text-center font-ventura text-3xl uppercase leading-none tracking-tight whitespace-nowrap sm:text-4xl md:text-left md:text-6xl md:whitespace-normal">
              Dayana <br className="hidden md:block" /> Pumajulca
            </p>
            <nav
              className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:w-auto lg:flex-wrap lg:items-center lg:justify-end"
              aria-label="Redes sociales"
            >
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.name as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-background/15 px-5 py-2.5 text-center text-sm tracking-wide text-background hover:bg-background hover:text-foreground lg:min-w-32"
                  >
                    {Icon ? <Icon className="size-4 shrink-0" /> : null}
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-background/15 pt-6 text-center text-sm text-background/60 md:flex-row md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Dayana Pumajulca.
              <br />
              Todos los derechos reservados.
            </p>
            <p className="md:text-right">
              Desarrollado por{" "}
              <span className="font-medium text-background">
                Dreamy Studio
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
