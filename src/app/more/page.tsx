'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Download, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bonusContent } from "@/lib/bonus-codes";
import Link from "next/link";

export default function MorePage() {
  const freeContent = bonusContent.filter(item => !item.requiredCode);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Mais Conteúdos
        </h1>
        <p className="text-muted-foreground mt-2">
          Materiais de apoio para sua jornada.
        </p>
      </header>

      {freeContent.length === 0 ? (
         <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Nenhum material de apoio disponível no momento.</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeContent.map(item => {
                const isInternalLink = item.href.startsWith('/');
                return (
                <Card key={item.id}>
                    <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                        <span>{item.title}</span>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    {isInternalLink ? (
                         <Button asChild className="w-full">
                            <Link href={item.href}>
                                <Download className="mr-2 h-4 w-4" />
                                Acessar
                            </Link>
                        </Button>
                    ) : (
                        <Button asChild className="w-full">
                            <a 
                            href={item.href}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            >
                            <Download className="mr-2 h-4 w-4" />
                            {item.type === 'PDF' ? 'Baixar' : 'Acessar'}
                            </a>
                        </Button>
                    )}
                    </CardContent>
                </Card>
                )
            })}
        </div>
      )}
    </div>
  );
}
