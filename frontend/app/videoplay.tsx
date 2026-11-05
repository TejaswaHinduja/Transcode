"use client"
import Image from "next/image";
import '@videojs/react/video/skin.css';
import { VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'


 const id=50e865
export default function VideoComponent() {
 
  return (
    
    <VideoPlayer>
      <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
      <HlsJsVideo src={`http://localhost:4000/streams/50e865/50e865.m3u8`} playsInline crossOrigin="anonymous" >
      <track kind="metadata" label="thumbnail" src={`http://localhost:4000/thumbnails/50e865/thumbnails.vtt`} default/>
      </HlsJsVideo>
    
      </VideoSkin>
    </VideoPlayer> 
  );
}
