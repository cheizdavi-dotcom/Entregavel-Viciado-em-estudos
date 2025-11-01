'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { modules } from '@/lib/seed';
import Link from 'next/link';

export default function AppPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Principal
        </h1>
        <p className="text-muted-foreground mt-2">
          Comece sua jornada para o fim da procrastinação.
        </p>
      </header>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {modules.map((module) => (
            <CarouselItem
              key={module.id}
              className="basis-11/12 pl-2 md:basis-1/3 lg:basis-1/4"
            >
              <Link href={`/module/${module.id}`}>
                <div className="p-1">
                  <Card className="overflow-hidden rounded-lg">
                    <CardContent className="flex aspect-[1080/1600] items-center justify-center p-0">
                      <Image
                        src={module.coverUrl}
                        alt={module.title}
                        width={1080}
                        height={1600}
                        className="object-cover w-full h-full"
                        data-ai-hint="course module"
                      />
                    </CardContent>
                  </Card>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold text-foreground truncate">
                      {module.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {module.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
