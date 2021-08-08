import Image from "next/image";
import {
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Song } from "../types/song";
import { useContext } from "react";
import { SongContext } from "../lib/song-context";
import { toSlug } from "../lib/slugger";
import Slider from "rc-slider";
import { useRef } from "react";

export default function MusicPlayer() {
  const { playingSong, albumSongs, setSong } = useContext(SongContext);
  const [playing, isPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [songPosition, setSongPosition] = useState(0);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [songLength, setSongLength] = useState(220);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (audioElement.current == null) return;

    if (firstLoad) {
      let vol = localStorage.getItem("volume")
      if (vol != null) {
        setVolume(parseInt(vol))
      }
      setFirstLoad(false);
      audioElement.current.volume = volume / 200;
    } else {
      isPlaying(true);
      audioElement.current.load();
      audioElement.current.play();
    }
  }, [playingSong]);

  const onPlaying = () => {
    if (audioElement.current != null) {
      setSongLength(audioElement.current.duration);
    }
  };

  const onClickPlay = () => {
    isPlaying(true);
    audioElement.current?.play();
  };

  const onClickPause = () => {
    isPlaying(false);
    audioElement.current?.pause();
  };

  const onVolumeUpdate = (e: number) => {
    setVolume(e);
    localStorage.setItem("volume", e.toString());
    if (audioElement.current != null) {
      audioElement.current.volume = e / 200;
    }
  };

  const onProgress = () => {
    if (audioElement.current != null) {
      setSongPosition(Math.floor(audioElement.current.currentTime));
    }
  };

  const onEnded = () => {
    if (setSong == null) return;

    if (albumSongs.length != 0) {
      let currentIndex = albumSongs.map((e) => e.name).indexOf(playingSong.name);
      if (currentIndex + 1 > albumSongs.length) {
        setSong(albumSongs[0])
      } else {
        setSong(albumSongs[currentIndex + 1])
      }
    } else {
      isPlaying(false);
    }
  };

  const onSongPositionChange = (value: number) => {
    setSongPosition(value);
    if (audioElement.current == null) return;
    audioElement.current.currentTime = value;
  };

  const onSkipBackward = () => {
    if (setSong == null) return;

    if (albumSongs.length == 1) {
    } else {
      let currentSongIndex = albumSongs.map((e) => e.name).indexOf(playingSong.name);
      if (currentSongIndex == 0) {
        setSongPosition(0);
        if (audioElement.current != null) {
          audioElement.current.currentTime = 0;
        }
      } else {
        setSong(albumSongs[currentSongIndex - 1]);
      }
    }
  };

  const onSkipForward = () => {
    if (setSong == null) return;

    if (albumSongs.length == 1) {
      return;
    } else {
      let currentSongIndex = albumSongs.map((e) => e.name).indexOf(playingSong.name);
      console.log(`Skipping songs to song ${currentSongIndex}/${albumSongs.length}`)
      if (currentSongIndex + 1 > albumSongs.length) {
        let nextSong = albumSongs[0];
        console.log(`Skipping forward to song ${nextSong.name}`)
        setSong(albumSongs[0]);
      } else {
        let nextSong = albumSongs[currentSongIndex + 1]
        console.log(`Skipping forward to song ${nextSong.name}`)
        setSong(albumSongs[currentSongIndex + 1]);
      }
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
      <div className="flex items-center dark:border-gray-700 bg-gray-100 dark:bg-lightblack px-5 py-5 fixed bottom-0 w-full border-t">
        <div className="flex flex-1 items-center">
          <div>
            <Image
              quality={100}
              width={75}
              height={75}
              src={`/imgs/${
                toSlug(playingSong.album as string) ?? "donda"
              }.png`}
            />
          </div>
          <div className="flex flex-col pl-3">
            <div className="font-bold text-md">{playingSong.name}</div>
            <div className="text-xs">{playingSong.author}</div>
          </div>
        </div>
        <div className="flex-col items-center justify-between flex">
          <div className="flex text-center">
            <RewindIcon
              onClick={onSkipBackward}
              className="text-gray-400"
              width={25}
            />
            {playing ? (
              <PauseIcon onClick={onClickPause} width={30} />
            ) : (
              <PlayIcon onClick={onClickPlay} width={30} />
            )}
            <FastForwardIcon
              onClick={onSkipForward}
              className="text-gray-400"
              width={25}
            />
          </div>
          <div className="flex text-xs justify-center items-center">
            <div>{formatTime(songPosition)}</div>
            <div className="px-2 w-96 relative">
              <Slider
                onChange={onSongPositionChange}
                max={songLength}
                value={songPosition}
              />
            </div>
            <div>{formatTime(songLength)}</div>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          {volume !== 0 ? (
            <VolumeUpIcon onClick={() => onVolumeUpdate(0)} width={15} />
          ) : (
            <VolumeOffIcon width={15} />
          )}
          <div className="relative pl-5 flex w-28 items-center text-green-500">
            <Slider max={100} onChange={onVolumeUpdate} value={volume} />
          </div>
        </div>
      </div>
      <audio
        ref={audioElement}
        onTimeUpdate={onProgress}
        onPlaying={onPlaying}
        onEnded={onEnded}
        id="audio"
        src={`https://res.cloudinary.com/steele/video/upload/v1628360887/${toSlug(
          playingSong.album ?? "donda"
        )}/${toSlug(playingSong.name)}.mp3`}
      />
    </>
  );
}
