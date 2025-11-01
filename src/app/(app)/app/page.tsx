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
        <CarouselContent>
          {modules.map((module) => (
            <CarouselItem
              key={module.id}
              className="basis-1/2 md:basis-1/3 lg:basis-4/12 xl:basis-1/5"
            >
              <Link href={`/module/${module.id}`} legacyBehavior>
                <a>
                  <div className="p-1">
                    <Card className="overflow-hidden">
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
                </a>
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
