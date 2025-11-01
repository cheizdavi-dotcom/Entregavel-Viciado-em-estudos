'use client';

import { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  youtubeId: string;
  onProgress: (seconds: number) => void;
  onCompleted: () => void;
}

export function YouTubePlayer({
  youtubeId,
  onProgress,
  onCompleted,
}: YouTubePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // A lógica de progresso foi simplificada para focar na funcionalidade principal.
  // Uma implementação completa usaria a API IFrame do YouTube para um rastreamento preciso.
  useEffect(() => {
    const timer = setInterval(() => {
      // Simula o progresso para fins de demonstração
      onProgress(Math.random() * 300); 
    }, 5000);

    return () => clearInterval(timer);
  }, [youtubeId, onProgress]);


  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1`;

  return (
    <div className="aspect-video w-full">
      <iframe
        ref={iframeRef}
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
