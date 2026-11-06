"use client"
import { useEffect, useRef, useState } from "react";
import '@videojs/react/video/skin.css';
import { VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video';

const id = "50e865";

interface CueData {
  startTime: number;
  endTime: number;
  url: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function VideoComponent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cues, setCues] = useState<CueData[]>([]);
  const [hoverCue, setHoverCue] = useState<CueData | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; percent: number } | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const track = Array.from(video.textTracks).find(t => t.kind === 'metadata');
      if (track) {
        track.mode = 'hidden'; // Triggers browser fetching and cue parsing
        
        track.oncuechange = () => {
          if (!track.cues || track.cues.length === 0) return;
          const parsedCues: CueData[] = [];
          
          for (let i = 0; i < track.cues.length; i++) {
            const cue = track.cues[i] as VTTCue;
            const text = cue.text; // e.g. "http://localhost:4000/thumbnails/50e865/50e865-0.jpg#xywh=160,0,160,90"
            const match = text.match(/(.*)#xywh=(\d+),(\d+),(\d+),(\d+)/);
            if (match) {
              parsedCues.push({
                startTime: cue.startTime,
                endTime: cue.endTime,
                url: match[1],
                x: parseInt(match[2], 10),
                y: parseInt(match[3], 10),
                w: parseInt(match[4], 10),
                h: parseInt(match[5], 10),
              });
            }
          }
          setCues(parsedCues);
        };
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !videoRef.current || cues.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const hoverPercent = mouseX / rect.width;
    const targetTime = hoverPercent * (videoRef.current.duration || 0);

    const activeCue = cues.find(c => targetTime >= c.startTime && targetTime <= c.endTime);
    if (activeCue) {
      setHoverCue(activeCue);
      setHoverPos({ x: mouseX, percent: hoverPercent });
    }
  };

  const handleMouseLeave = () => {
    setHoverCue(null);
    setHoverPos(null);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}
    >
      {/* Thumbnail Tooltip */}
      {hoverCue && hoverPos && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: `${hoverPos.x}px`,
            transform: 'translateX(-50%)',
            width: `${hoverCue.w}px`,
            height: `${hoverCue.h}px`,
            backgroundImage: `url(${hoverCue.url})`,
            backgroundPosition: `-${hoverCue.x}px -${hoverCue.y}px`,
            borderRadius: '4px',
            border: '2px solid #fff',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}

      <VideoPlayer>
        <VideoSkin style={{ width: '100%', height: '100%' }}>
          <HlsJsVideo 
            ref={videoRef}
            src={`http://localhost:4000/streams/${id}/${id}.m3u8`} 
            playsInline 
            crossOrigin="anonymous"
          >
            <track 
              kind="metadata" 
              label="thumbnail" 
              src={`http://localhost:4000/thumbnails/${id}/thumbnails.vtt`} 
              default
            />
          </HlsJsVideo>
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}