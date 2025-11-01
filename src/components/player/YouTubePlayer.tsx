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
            // Ensure controls are enabled
            controls: 1, 
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
       // If YT API is already loaded, but player exists, destroy it before creating new one
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      setupPlayer();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      // Don't destroy player on component unmount if it's not the last one
      // The key prop on the component will handle re-creation
    };
  }, [youtubeId, startSeconds]);

  const onPlayerReady = (event: any) => {
    // Player is ready. You could auto-play here if desired.
    // event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      // Set new interval
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            const currentTime = playerRef.current.getCurrentTime();
            onProgress(currentTime);
            
            const duration = playerRef.current.getDuration();
            if (duration > 0 && (currentTime / duration) >= 0.95) {
                onCompleted();
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
            }
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
    <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg">
      <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
}
