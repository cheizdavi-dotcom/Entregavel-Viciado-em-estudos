'use client';

import { bonusContent } from '@/lib/bonus-codes';
import { notFound, redirect } from 'next/navigation';
import { YouTubePlayer } from '@/components/player/YouTubePlayer';
import { useProgress } from '@/hooks/useProgress.tsx';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

// NOTE: This page does not track progress, it's just a simple player.
// We also don't check for unlock status here on the client-side for simplicity,
// relying on the entry page to handle that. A more robust solution might
// involve server-side protection or re-checking the unlock status here.

export default function BonusVideoPage({ params }: { params: { id: string } }) {
  
  const bonus = useMemo(() => bonusContent.find((b) => b.id === params.id && b.requiredCode), [params.id]);

  // If the bonus doesn't exist or doesn't have a video, it's a 404.
  if (!bonus || !bonus.youtubeId) {
    notFound();
  }

  // A simple no-op function for progress callbacks as we don't save progress for bonuses.
  const noOp = () => {};

  return (
    <div className="container mx-auto p-4 max-w-4xl">
       <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/bonus">
                    <Home className="mr-2"/>
                    Voltar para Bônus
                </Link>
            </Button>
       </div>
      <div className="mb-4 aspect-video bg-black rounded-lg overflow-hidden">
          <YouTubePlayer 
              key={bonus.id}
              youtubeId={bonus.youtubeId}
              onProgress={noOp}
              onCompleted={noOp}
              startSeconds={0}
          />
      </div>
      <h1 className="text-3xl font-bold font-headline">{bonus.title}</h1>
      <p className="text-muted-foreground mt-1">{bonus.description}</p>
    </div>
  );
}
