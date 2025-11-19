'use client';

import { useEffect, useRef } from 'react';

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
    // Se não houver ID, não faça nada.
    if (!youtubeId) return;

    const setupPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
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
          controls: 1,
          autoplay: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = () => {
        setupPlayer();
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else {
      setupPlayer();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        // Adicionada verificação para evitar erro na destruição
        try {
            playerRef.current.destroy();
            playerRef.current = null;
        } catch (e) {
            console.error("Error destroying YouTube player:", e);
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youtubeId]); // A dependência AGORA é SÓ o youtubeId.

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
      
    if (event.data === window.YT.PlayerState.PLAYING) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            const currentTime = playerRef.current.getCurrentTime();
            onProgress(currentTime);
            
            const duration = playerRef.current.getDuration();
            if (duration > 0 && (currentTime / duration) >= 0.95) {
                // onCompleted will be called, so we can clear the interval here
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
                onCompleted();
            }
        }
      }, 250); // Increased frequency for smoother progress updates
    } else if (event.data === window.YT.PlayerState.ENDED) {
        onCompleted();
    }
  };

  if (!youtubeId) {
    return (
       <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg bg-black flex items-center justify-center">
            <p className="text-muted-foreground">Vídeo indisponível.</p>
       </div>
    );
  }


  return (
    <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg">
      <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
}
