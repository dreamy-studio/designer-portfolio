import Image from "next/image";
import FadeInView from "@/components/ui/FadeInView";
import HeroActions from "@/components/ui/HeroActions";
import HeroGridBackground from "./HeroGridBackground";
import { HERO } from "@/data/site";

export default function HeroSection() {
  return (
    <>
      <HeroGridBackground />
      <FadeInView className="relative z-10 flex items-center justify-center lg:justify-start">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="font-display text-6xl font-bold leading-none tracking-tighter md:text-7xl xl:text-8xl 2xl:text-9xl">
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted lg:mx-0">
            {HERO.description}
          </p>
          <HeroActions />
        </div>
      </FadeInView>
      <FadeInView className="relative z-10 flex items-center justify-center lg:items-stretch">
        <div className="relative flex w-full items-center justify-center overflow-hidden py-4 lg:h-full lg:py-0">
          <Image
            src="/assets/home/hero-logo.webp"
            alt="Hero logo"
            width={2250}
            height={1500}
            className="h-auto w-full max-w-130 object-contain lg:h-full lg:max-h-dvh lg:w-full lg:max-w-none lg:object-contain"
            priority
            sizes="(max-width: 768px) 90vw, 50vw"
          />
        </div>
      </FadeInView>
    </>
  );
}
