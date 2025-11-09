'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function PodcastsPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
          Podcasts
        </h1>
        <p className="text-muted-foreground mt-2">
          Episódios para ouvir quando e onde quiser.
        </p>
      </header>

      <Card className="text-center">
        <CardContent className="p-10 sm:p-16">
          <Mic className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            Em breve
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Novos episódios e conteúdos em áudio aparecerão aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
