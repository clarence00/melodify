"use client";
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
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
    <div className="flex items-center justify-between px-4 h-full">
      <div className="flex items-center gap-4 w-1/4">
        {currentFile.albumArt && (
          <img
            src={currentFile.albumArt}
            alt={currentFile.name}
            className="w-12 h-12 rounded"
          />
        )}
        <div>
          <p className="text-sm font-bold">
            {currentFile.name.replace(".mp3", "")}
          </p>
          <p className="text-xs text-fgSecondary">{currentFile.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-accent">
            <SkipBack
              className="size-4"
              onClick={playPrevious}
            />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 hover:text-accent">
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </button>
          <button className="p-2 hover:text-accent">
            <SkipForward
              className="size-4"
              onClick={playNext}
            />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full mt-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div className="w-full h-1 bg-bgMain rounded-full">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-1/4 flex items-center justify-end">
        <Volume2 className="size-4 mr-2" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 custom-range"
          style={{ "--value": volume } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default Player;
