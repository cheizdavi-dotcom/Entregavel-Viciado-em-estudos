'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlayerProps {
  youtubeId: string;
  onProgress: (seconds: number) => void;
  onCompleted: () => void;
  startSeconds: number;
}

export function YouTubePlayer({ youtubeId, onProgress, onCompleted, startSeconds }: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const setupPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: youtubeId,
          playerVars: {
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            fs: 1,
            disablekb: 0,
            start: Math.floor(startSeconds || 0),
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = () => {
        setupPlayer();
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    } else {
      setupPlayer();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        // Checking if destroy method exists before calling it.
        if (typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
        }
        playerRef.current = null;
      }
    };
  }, [youtubeId, startSeconds]);

  const onPlayerReady = (event: any) => {
    // Player is ready
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      progressIntervalRef.current = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        onProgress(currentTime);
        
        const duration = playerRef.current.getDuration();
        if (duration > 0 && currentTime / duration >= 0.95) {
            onCompleted();
        }

      }, 1000);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
       if (event.data === window.YT.PlayerState.ENDED) {
        onCompleted();
      }
    }
  };

  return (
    <div className="aspect-video w-full">
      <div id="youtube-player" className="w-full h-full"></div>
    </div>
  );
}
