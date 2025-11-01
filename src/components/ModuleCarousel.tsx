"use client";

import type { Module } from "@/lib/types";
import { ModuleCard } from "./ModuleCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ModuleCarouselProps {
  modules: Module[];
}

export function ModuleCarousel({ modules }: ModuleCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {modules.map((module) => (
          <CarouselItem key={module.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
            <ModuleCard module={module} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
