"use client"
import '@videojs/react/video/skin.css';
import { Video,VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video';

export default function Page() {
  return (
    <VideoPlayer>
      <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
      <Video src="https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM.m3u8">

      </Video>
      </VideoSkin>
    </VideoPlayer>
  );
}