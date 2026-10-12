"use client";

import type { SocialProject } from "@/data/social";
import FadeInView from "@/components/ui/FadeInView";
import CaseHero from "@/components/case/CaseHero";
import SocialGalleryGrid from "./SocialGalleryGrid";
import CaseSubheader from "@/components/case/CaseSubheader";
import { PAGE_PADDING_X } from "@/lib/constants";

const KIND_LABELS: Record<string, string> = {
  banner: "Banners",
  carousel: "Carruseles",
  post: "Posts",
  reel: "Reels",
  mockup: "Mockups",
};

function groupByKind(gallery: SocialProject["gallery"]) {
  const groups = new Map<string, typeof gallery>();
  for (const asset of gallery) {
    if (!groups.has(asset.kind)) groups.set(asset.kind, []);
    groups.get(asset.kind)!.push(asset);
  }
  // Orden editorial: banners → carruseles → mockups → posts → reels
  const order = ["banner", "carousel", "mockup", "post", "reel"];
  return [...groups.entries()].sort(
    (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
  );
}

export default function SocialCasePage({ project }: { project: SocialProject }) {
  const grouped = groupByKind(project.gallery);
  const kinds = grouped.map(([k]) => k);

  return (
    <main className={`py-24 ${PAGE_PADDING_X}`}>
      <CaseHero
        title={project.title}
        description={project.description}
        year={project.year}
        palette={project.palette}
        thumbnail={project.thumbnail}
      />

      {/* Subheader de secciones: hijo directo de main para que el sticky recorra la galería */}
      <CaseSubheader
        links={kinds.map((kind) => ({
          id: `section-${kind}`,
          label: KIND_LABELS[kind] ?? kind,
        }))}
      />

      {/* Secciones apiladas por kind */}
      <div className="mt-12 space-y-16">
        {grouped.map(([kind, assets]) => (
          <section key={kind} id={`section-${kind}`} className="scroll-mt-32">
              <FadeInView>
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {KIND_LABELS[kind] ?? kind}
                  </h2>
                </div>
              </FadeInView>
              <SocialGalleryGrid assets={assets} />
          </section>
        ))}
      </div>
    </main>
  );
}
