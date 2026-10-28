"use client"
import '@videojs/react/video/skin.css';
import { Video,VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video';

export default function Page() {
  return (
    <VideoPlayer>
      <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
      
      </VideoSkin>
    </VideoPlayer>
  );
}