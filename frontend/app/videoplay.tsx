"use client"
import Image from "next/image";
import '@videojs/react/video/skin.css';
import { VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'
import '@videojs/html/ui/thumbnail';

const id="9362e9"
export default function VideoComponent() {
  return (
    
    <VideoPlayer>
      <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
      <HlsJsVideo src={`http://localhost:4000/streams/${id}/${id}.m3u8`} playsInline >
      <track kind="metadata" label="thumbnail"/>
      </HlsJsVideo>
      <media-time-slider
      
      
      </VideoSkin>
    </VideoPlayer> 
  );
}
