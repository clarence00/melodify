"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Ellipsis,
  PlusCircle,
} from "lucide-react";
import { useAudio } from "../context/AudioContext";

const Player = () => {
  const { currentAudio, currentFile, playNext, playPrevious } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!currentAudio) return;
    currentAudio.volume = volume;

    const updateProgress = () => {
      const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
      setProgress(progress);
      setCurrentTime(currentAudio.currentTime);
      setDuration(currentAudio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    currentAudio.addEventListener("timeupdate", updateProgress);
    currentAudio.addEventListener("play", handlePlay);
    currentAudio.addEventListener("pause", handlePause);
    currentAudio.addEventListener("ended", handleEnded);

    return () => {
      currentAudio.removeEventListener("timeupdate", updateProgress);
      currentAudio.removeEventListener("play", handlePlay);
      currentAudio.removeEventListener("pause", handlePause);
      currentAudio.removeEventListener("ended", handleEnded);
    };
  }, [currentAudio, volume]);

  useEffect(() => {
    if (currentAudio) {
      currentAudio.volume = volume;
    }
  }, [volume, currentAudio]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const togglePlay = () => {
    if (!currentAudio) return;
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentFile) return null;

  return (
    <div className="flex items-center justify-between px-6 h-full">
      <div className="flex items-center gap-4 w-[40%]">
        <button
          onClick={togglePlay}
          className="p-2 hover:text-base-content text-neutral rounded-full bg-accent cursor-pointer hover:bg-accent/50">
          {isPlaying ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
        </button>
        <button className="p-2 hover:bg-base-content-200/30 cursor-pointer rounded-full text-base-content">
          <SkipBack
            className="size-4 icon-filled"
            onClick={playPrevious}
          />
        </button>
        <button className="p-2 hover:bg-base-content-200/30 cursor-pointer rounded-full text-base-content">
          <SkipForward
            className="size-4 icon-filled"
            onClick={playNext}
          />
        </button>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div className="w-full h-1 bg-base-100 rounded-full">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="h-[65%] w-0.5 bg-base-content-200/30 rounded-full" />
      <div className="flex items-center justify-between w-[55%] h-full">
        <div className="flex gap-2.5 justify-start items-center">
          {currentFile.albumArt && (
            <img
              src={currentFile.albumArt}
              alt={currentFile.name}
              className="w-12 h-12 rounded-md"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-base-content">
              {currentFile.name.replace(".mp3", "")}
            </span>
            <span className="text-xs text-base-content-200">
              {currentFile.artist}
            </span>
            <span className="text-xs text-base-content-200">
              {currentFile.album}
            </span>
          </div>
        </div>
        <div className="flex gap-1 text-base-content-200 items-center">
          <button className="p-2 hover:bg-base-content-200/30 hover:text-success rounded-full cursor-pointer">
            <Heart className="size-5" />
          </button>
          <button className="p-2 hover:bg-base-content-200/30 hover:text-success rounded-full cursor-pointer">
            <PlusCircle className="size-5" />
          </button>
          <button className="p-2 hover:bg-base-content-200/30 hover:text-success rounded-full cursor-pointer">
            <Ellipsis className="size-5" />
          </button>
          <div className=" flex ml-1.5 items-center justify-end">
            <Volume2 className="size-4 mr-2" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 custom-range"
              style={{ "--value": volume } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
