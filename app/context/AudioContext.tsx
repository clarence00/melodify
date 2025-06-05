"use client";
import { createContext, useContext, useState } from "react";

interface AudioContextType {
  currentAudio: HTMLAudioElement | null;
  currentFile: any;
  playAudio: (file: any) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }) {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);

  interface AudioFile {
    publicUrl: string;
    [key: string]: any;
  }

  const playAudio = (file: AudioFile): void => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(file.publicUrl);
    audio.play();
    setCurrentAudio(audio);
    setCurrentFile(file);
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        currentFile,
        playAudio,
      }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
