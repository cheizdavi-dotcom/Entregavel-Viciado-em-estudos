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

  useEffect(() => {
    const player = iframeRef.current;
    let progressInterval: NodeJS.Timeout | null = null;
    let isCompleted = false;

    // This is a simplified simulation. A real implementation would use the YouTube IFrame Player API.
    const handlePlay = () => {
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        // Simulate progress. In a real scenario, you'd get this from the player API.
        const currentTime = (player?.dataset.currentTime as any | 0) + 1;
        player!.dataset.currentTime = currentTime;
        onProgress(currentTime);

        const duration = player?.dataset.duration as any | 300; // Placeholder duration
        if (!isCompleted && currentTime / duration >= 0.9) {
          isCompleted = true;
          onCompleted();
        }
      }, 1000);
    };

    const handlePause = () => {
      if (progressInterval) clearInterval(progressInterval);
    };

    // Simulate events
    player?.addEventListener('play', handlePlay);
    player?.addEventListener('pause', handlePause);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      player?.removeEventListener('play', handlePlay);
      player?.removeEventListener('pause', handlePause);
    };
  }, [youtubeId, onProgress, onCompleted]);

  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1`;

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
