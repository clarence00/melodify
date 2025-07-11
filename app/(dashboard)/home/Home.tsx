"use client";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";
import AlbumCard from "../../components/AlbumCard";
import DetailedView from "../../components/DetailedView";

interface AudioFile {
  name: string;
  album?: string;
  artist?: string;
  albumArt?: string;
  duration?: string;
  publicUrl?: string;
  [key: string]: any;
}

const Home = () => {
  const { audioFiles, isLoading } = useFetchAudioFiles();
  const { playAudio } = useAudio();
  const [viewMode, setViewMode] = useState("list");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const albumScrollContainerRef = useRef<HTMLDivElement>(null);
  const artistScrollContainerRef = useRef<HTMLDivElement>(null);

  const getAlbumCardNodes = (containerID: React.RefObject<HTMLDivElement>) => {
    if (!containerID.current) return [];
    return Array.from(containerID.current.children) as HTMLElement[];
  };

  const handleScrollLeft = (containerID: React.RefObject<HTMLDivElement>) => {
    const container = containerID.current;
    if (!container) return;
    const cards = getAlbumCardNodes(containerID);
    const scrollLeft = container.scrollLeft;

    let targetIndex = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft + cards[i].offsetWidth - 1 >= scrollLeft) {
        targetIndex = Math.max(0, i - 1);
        break;
      }
    }
    container.scrollTo({
      left: cards[targetIndex].offsetLeft,
      behavior: "smooth",
    });
  };

  const handleScrollRight = (containerID: React.RefObject<HTMLDivElement>) => {
    const container = containerID.current;
    if (!container) return;
    const cards = getAlbumCardNodes(containerID);
    const scrollLeft = container.scrollLeft;

    let targetIndex = cards.length - 1;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft > scrollLeft + 5) {
        targetIndex = i;
        break;
      }
    }
    container.scrollTo({
      left: cards[targetIndex].offsetLeft,
      behavior: "smooth",
    });
  };

  const albums = audioFiles.reduce<Record<string, typeof audioFiles>>(
    (acc, file) => {
      const album = file.album || "Unknown Album";
      if (!acc[album]) acc[album] = [];
      acc[album].push(file);
      return acc;
    },
    {}
  );

  const artists = audioFiles.reduce<Record<string, typeof audioFiles>>(
    (acc, file) => {
      const artist = file.artist || "Unknown Artist";
      if (!acc[artist]) acc[artist] = [];
      acc[artist].push(file);
      return acc;
    },
    {}
  );

  if (selectedAlbum) {
    return (
      <DetailedView
        title={selectedAlbum}
        files={albums[selectedAlbum]}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onBack={() => setSelectedAlbum(null)}
        playAudio={(files, idx) => playAudio(files, idx)}
        showArtist={true}
      />
    );
  }

  if (selectedArtist) {
    return (
      <DetailedView
        title={selectedArtist}
        files={artists[selectedArtist]}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onBack={() => setSelectedArtist(null)}
        playAudio={(files, idx) => playAudio(files, idx)}
        showArtist={true}
      />
    );
  }

  return (
    <>
      <h1 className="mb-1.5 ml-1 text-2xl font-bold text-base-content">
        Albums
      </h1>
      <div className="h-0.5 bg-neutral w-full rounded-full mb-4" />
      <div className="relative mb-12">
        <button
          className="absolute left-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-base-300/50 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollLeft(albumScrollContainerRef)}>
          <ArrowLeft className="size-6 text-base-content opacity-0 group-hover:opacity-100" />
        </button>
        <div
          ref={albumScrollContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-4">
          {isLoading ? (
            <div className="w-full text-center text-base-content">
              Fetching music...
            </div>
          ) : Object.keys(albums).length > 0 ? (
            Object.entries(albums).map(([albumName, files]) => (
              <AlbumCard
                key={albumName}
                albumName={albumName}
                albumArt={files[0].albumArt}
                artists={Array.from(new Set(files.map((f) => f.artist)))}
                onClick={() => setSelectedAlbum(albumName)}
              />
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
        <button
          className="absolute right-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-base-300/50 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollRight(albumScrollContainerRef)}>
          <ArrowRight className="size-6 text-base-content opacity-0 group-hover:opacity-100" />
        </button>
      </div>
      <h1 className="mb-1.5 ml-1 text-2xl font-bold text-base-content">
        Artist
      </h1>
      <div className="h-0.5 bg-neutral w-full rounded-full mb-4" />
      <div className="relative mb-8">
        <button
          className="absolute left-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-base-300/50 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollLeft(artistScrollContainerRef)}>
          <ArrowLeft className="size-6 text-base-content opacity-0 group-hover:opacity-100" />
        </button>
        <div
          ref={artistScrollContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-4">
          {isLoading ? (
            <div className="w-full text-center text-base-content">
              Fetching music...
            </div>
          ) : Object.keys(artists).length > 0 ? (
            Object.entries(artists).map(([artistName, files]) => (
              <AlbumCard
                key={artistName}
                albumName={artistName}
                onClick={() => setSelectedArtist(artistName)}
              />
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
        <button
          className="absolute right-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-base-300/50 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollRight(albumScrollContainerRef)}>
          <ArrowRight className="size-6 text-base-content opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    </>
  );
};

export default Home;
