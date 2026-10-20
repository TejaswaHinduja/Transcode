
import Image from "next/image";
import '@videojs/react/video/skin.css';
import { Video,VideoPlayer, VideoSkin } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'

export default function Home() {
  return (
    <VideoPlayer>
      <VideoSkin style={{ width: '100%', aspectRatio: '16 / 9' }}>
      <Video src="https://www.youtube.com/watch?v=kHuFPwS0zuk&t=2793s">

      </Video>
      </VideoSkin>
    </VideoPlayer>
  );
}
