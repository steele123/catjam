import Image from "next/image";
import {
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import {
  AudioHTMLAttributes,
  ClassAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";
import { Song } from "../types/song";
import { useContext } from "react";
import { SongContext } from "../lib/song-context";
import { toSlug } from "../lib/slugger";
import { Slider } from "@material-ui/core";
import { useRef } from "react";

interface Props {
  song?: Song;
}

export default function MusicPlayer({ song }: Props) {
  const { playingSong, albumName } = useContext(SongContext);
  const [playing, isPlaying] = useState(false);
  const [volume, setVolume] = useState(5);
  const [songPosition, setSongPosition] = useState(0);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [songLength, setSongLength] = useState(220);

  useEffect(() => {
    if (audioElement.current != null) {
      audioElement.current.volume = 0.05;
      isPlaying(true)
      audioElement.current.load();
      audioElement.current.play();
    }
  }, [playingSong]);

  const onPlaying = () => {
    console.log("okaychamp")
    if (audioElement.current != null) {
      setSongLength(audioElement.current.duration)
    }
  }

  const onClickPlay = () => {
    isPlaying(true);
    audioElement.current?.play();
  };

  const onClickPause = () => {
    isPlaying(false);
    audioElement.current?.pause();
  };

  const onVolumeUpdate = (e: any, value: any) => {
    setVolume(value);
    if (audioElement.current != null) {
      audioElement.current.volume = value / 100;
    }
  };

  const onProgress = () => {
    if (audioElement.current != null) {
      setSongPosition(Math.floor(audioElement.current.currentTime));
    }
  };

  function formatTime(seconds: number) {
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    if (s < 10) {
      return `${m}:0${s}`;
    } else {
      return `${m}:${s}`;
    }
  }

  return (
    <>
      <div className="flex items-center bg-gray-100 dark:bg-lightblack px-5 py-5 fixed bottom-0 w-full border-t">
        <div className="flex flex-1 items-center">
          <div>
            <Image
              quality={100}
              width={75}
              height={75}
              src={`/imgs/${albumName}.png`}
            />
          </div>
          <div className="flex flex-col pl-3">
            <div className="font-bold text-md">{playingSong.name}</div>
            <div className="text-xs">{playingSong.author}</div>
          </div>
        </div>
        <div className="flex-col items-center justify-between flex">
          <div className="flex text-center">
            <RewindIcon className="text-gray-400" width={25} />
            {playing ? (
              <PauseIcon onClick={onClickPause} width={30} />
            ) : (
              <PlayIcon onClick={onClickPlay} width={30} />
            )}
            <FastForwardIcon className="text-gray-400" width={25} />
          </div>
          <div className="flex text-xs justify-center items-center">
            <div>{formatTime(songPosition)}</div>
            <div className="px-2 w-96 relative">
              <Slider disabled={true} max={240} value={songPosition} />
            </div>
            <div>{formatTime(songLength)}</div>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <VolumeUpIcon width={15} />
          <div className="relative pl-5 flex w-28 items-center">
            <Slider onChange={onVolumeUpdate} value={volume} />
          </div>
        </div>
      </div>
      <audio
        ref={audioElement}
        onTimeUpdate={onProgress}
        onPlaying={onPlaying}
        id="audio"
        src={`https://res.cloudinary.com/steele/video/upload/v1628360887/donda/${toSlug(playingSong.name)}.mp3`}
      />
    </>
  );
}
