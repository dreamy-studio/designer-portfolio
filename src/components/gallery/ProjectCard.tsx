"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  slug: string;
  title: string;
  year?: string;
  eyebrow?: string;
  thumbnail: string;
  variant?: "default" | "large";
}

function ProjectCard({
  slug,
  title,
  year,
  eyebrow,
  thumbnail,
  variant = "default",
}: ProjectCardProps) {
  const isLarge = variant === "large";

  return (
    <Link href={`/projects/${slug}`} className={isLarge ? "block h-full" : undefined}>
      <div className="group flex h-full cursor-pointer flex-col">
        <div
          className={
            isLarge
              ? "relative aspect-video overflow-hidden bg-surface"
              : "relative flex-1 min-h-45 overflow-hidden bg-surface"
          }
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            className="object-cover group-hover:scale-105"
          />
        </div>
        <div className="pt-5">
          <p className="text-xs uppercase tracking-widest text-muted">
            {eyebrow ?? year}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-foreground">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProjectCard);
