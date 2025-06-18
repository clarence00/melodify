"use client";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface AudioFile {
  publicUrl?: string;
  [key: string]: string;
}
interface AudioContextType {
  currentAudio: HTMLAudioElement | null;
  currentFile: AudioFile | null;
  playAudio: (files: AudioFile[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  isPlaying: boolean;
  playlist: AudioFile[];
  currentIndex: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentFile, setCurrentFile] = useState<AudioFile | null>(null);
  const [playlist, setPlaylist] = useState<AudioFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playlistRef = useRef<AudioFile[]>(playlist);
  const currentIndexRef = useRef<number>(currentIndex);
  const currentAudioRef = useRef<HTMLAudioElement | null>(currentAudio);

  playlistRef.current = playlist;
  currentIndexRef.current = currentIndex;

  const cleanupAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.src = "";
      currentAudioRef.current.onended = null;
      currentAudioRef.current = null;
    }
    setCurrentAudio(null);
  };

  const playTrackAtIndex = (index: number) => {
    const files = playlistRef.current;
    if (index < 0 || index >= files.length) {
      // Out of bounds, stop playback
      cleanupAudio();
      setIsPlaying(false);
      setCurrentFile(null);
      setCurrentIndex(-1);
      return;
    }
    cleanupAudio();
    const file = files[index];
    const audio = new Audio(file.publicUrl);
    audio.onended = () => {
      playNext();
    };
    audio.play();
    setCurrentAudio(audio);
    currentAudioRef.current = audio;
    setCurrentFile(file);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const playAudio = useCallback(
    (fileOrFiles: AudioFile | AudioFile[], startIndex: number = 0) => {
      let files: AudioFile[] = [];

      if (Array.isArray(fileOrFiles)) {
        files = fileOrFiles;
      } else {
        files = [fileOrFiles];
      }

      if (files.length === 0) return;

      setPlaylist(files);
      playlistRef.current = files;
      playTrackAtIndex(startIndex);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const playNext = useCallback(() => {
    let idx = currentIndexRef.current;
    const files = playlistRef.current;
    if (files.length === 0) return;
    const nextIndex = idx + 1;
    if (nextIndex < files.length) {
      playTrackAtIndex(nextIndex);
    } else {
      // End of playlist
      cleanupAudio();
      setIsPlaying(false);
      setCurrentFile(null);
      setCurrentIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playPrevious = useCallback(() => {
    let idx = currentIndexRef.current;
    const files = playlistRef.current;
    if (files.length === 0) return;
    const prevIndex = idx - 1;
    if (prevIndex >= 0) {
      playTrackAtIndex(prevIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clean up audio on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => () => cleanupAudio(), []);

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        currentFile,
        playAudio,
        playNext,
        playPrevious,
        isPlaying,
        playlist,
        currentIndex,
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
