import Link from "next/link";
import Image from "next/image";
import type { Module } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === `module-${module.order}`);

  return (
    <Link href={`/module/${module.id}`} className="block h-full">
      <Card className="h-full w-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="aspect-[9/13.5] w-full overflow-hidden">
             {placeholder && (
                <Image
                  src={placeholder.imageUrl}
                  alt={module.title}
                  width={1080}
                  height={1600}
                  className="h-full w-full object-cover"
                  data-ai-hint={placeholder.imageHint}
                />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold leading-tight">
            {module.title}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{module.subtitle}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
