"use client";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Dot, Play, PlusCircle } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";
import { List, AlignJustify } from "lucide-react";
import AlbumCard from "../../components/AlbumCard";
import ListViewDisplay from "../../components/ListViewDisplay";
import CompactViewDisplay from "../../components/CompactViewDisplay";

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
    // Only direct children (album cards)
    return Array.from(containerID.current.children) as HTMLElement[];
  };

  const handleScrollLeft = (containerID: React.RefObject<HTMLDivElement>) => {
    const container = containerID.current;
    if (!container) return;
    const cards = getAlbumCardNodes(containerID);
    const scrollLeft = container.scrollLeft;

    // Find the card that is just before the current scroll position
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

    // Find the first card that is not fully visible on the right
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
    const files = albums[selectedAlbum];

    const durationToSeconds = (duration: string) => {
      const [min, sec] = duration.split(":").map(Number);
      return min * 60 + sec;
    };
    const formatDuration = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return h > 0
        ? `${h}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`
        : `${m}:${s.toString().padStart(2, "0")}`;
    };

    const totalDurationSeconds = files.reduce((acc, file) => {
      return acc + durationToSeconds(file.duration || "0:00");
    }, 0);

    const totalDurationFormatted = formatDuration(totalDurationSeconds);
    return (
      <>
        <div className="flex gap-16">
          <div className="w-full flex flex-col overflow-y-auto">
            <button
              className="mb-2.5 flex items-center text-fgSecondary w-full hover:text-fgPrimary"
              onClick={() => setSelectedAlbum(null)}>
              <ArrowLeft className="mr-2 size-5" />
              Back to Home
            </button>
            <div className="flex justify-between">
              <h2 className="text-2xl ml-1 font-bold w-full text-fgPrimary">
                {selectedAlbum}
              </h2>
              <div className="flex justify-end gap-4 w-full pr-2">
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer h-fit ${
                    viewMode === "list"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setViewMode("list")}>
                  <List className="size-5" />
                </div>
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer h-fit ${
                    viewMode === "compact"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setViewMode("compact")}>
                  <AlignJustify className="size-5" />
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center ml-1 text-sm text-fgSecondary mb-2">
              <span>{files[0].artist}</span>
              <Dot className="size-4" />
              <span>{files.length} songs</span>
              <Dot className="size-4" />
              <span>{totalDurationFormatted}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="px-2 grid grid-cols-12 font-semibold mt-4 text-fgSecondary">
                <span
                  className={`${
                    viewMode === "list" ? "col-span-6" : "col-span-6"
                  }`}>
                  Title
                </span>
                <span>Duration</span>
                <span></span>
              </div>
              <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-2.5" />
              {files.map((file) =>
                viewMode === "list" ? (
                  <ListViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={() => playAudio(file)}
                  />
                ) : (
                  <CompactViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={() => playAudio(file)}
                    albumDisplay={false}
                  />
                )
              )}
            </div>
          </div>
          <div className="sticky top-4 w-60 h-fit flex flex-col gap-4">
            <img
              src={files[0].albumArt}
              alt={files[0].name}
              className="min-w-60 max-w-60 h-60 rounded-lg"
            />
            <div className="flex gap-4">
              <button
                className="rounded-full bg-accent px-4 py-1 flex items-center justify-center w-fit hover:bg-accent/80 transition-colors"
                onClick={() => playAudio(files)}>
                <Play
                  className="size-5 text-bgSecondary"
                  fill={"bg-bgSecondary"}
                />
                <span className="text-bgSecondary ml-2 text-xl font-bold">
                  Play
                </span>
              </button>
              <button className="rounded-full hover:bg-fgTertiary p-1">
                <PlusCircle className="size-7 text-fgSecondary" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (selectedArtist) {
    const files = artists[selectedArtist];

    const durationToSeconds = (duration: string) => {
      const [min, sec] = duration.split(":").map(Number);
      return min * 60 + sec;
    };
    const formatDuration = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return h > 0
        ? `${h}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`
        : `${m}:${s.toString().padStart(2, "0")}`;
    };

    const totalDurationSeconds = files.reduce((acc, file) => {
      return acc + durationToSeconds(file.duration || "0:00");
    }, 0);

    const totalDurationFormatted = formatDuration(totalDurationSeconds);
    return (
      <>
        <div className="flex gap-16">
          <div className="w-full flex flex-col overflow-y-auto">
            <button
              className="mb-2.5 flex items-center text-fgSecondary w-full hover:text-fgPrimary"
              onClick={() => setSelectedArtist(null)}>
              <ArrowLeft className="mr-2 size-5" />
              Back to Home
            </button>
            <div className="flex justify-between">
              <h2 className="text-2xl ml-1 font-bold w-full text-fgPrimary">
                {selectedArtist}
              </h2>
              <div className="flex justify-end gap-4 w-full pr-2">
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer h-fit ${
                    viewMode === "list"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setViewMode("list")}>
                  <List className="size-5" />
                </div>
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer h-fit ${
                    viewMode === "compact"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setViewMode("compact")}>
                  <AlignJustify className="size-5" />
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center ml-1 text-sm text-fgSecondary mb-2">
              <span>{files[0].artist}</span>
              <Dot className="size-4" />
              <span>{files.length} songs</span>
              <Dot className="size-4" />
              <span>{totalDurationFormatted}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="px-2 grid grid-cols-12 font-semibold mt-4 text-fgSecondary">
                <span
                  className={`${
                    viewMode === "list" ? "col-span-6" : "col-span-6"
                  }`}>
                  Title
                </span>
                <span>Duration</span>
                <span></span>
              </div>
              <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-2.5" />
              {files.map((file) =>
                viewMode === "list" ? (
                  <ListViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={() => playAudio(file)}
                  />
                ) : (
                  <CompactViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={() => playAudio(file)}
                    albumDisplay={false}
                  />
                )
              )}
            </div>
          </div>
          <div className="sticky top-4 w-60 h-fit flex flex-col gap-4">
            <img
              src={files[0].albumArt}
              alt={files[0].name}
              className="min-w-60 max-w-60 h-60 rounded-lg"
            />
            <div className="flex gap-4">
              <button
                className="rounded-full bg-accent px-4 py-1 flex items-center justify-center w-fit hover:bg-accent/80 transition-colors"
                onClick={() => playAudio(files)}>
                <Play
                  className="size-5 text-bgSecondary"
                  fill={"bg-bgSecondary"}
                />
                <span className="text-bgSecondary ml-2 text-xl font-bold">
                  Play
                </span>
              </button>
              <button className="rounded-full hover:bg-fgTertiary p-1">
                <PlusCircle className="size-7 text-fgSecondary" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-1.5 ml-1 text-2xl font-bold text-fgPrimary">Albums</h1>
      <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-4" />
      <div className="relative mb-12">
        <button
          className="absolute left-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-bgSecondary/70 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollLeft(albumScrollContainerRef)}>
          <ArrowLeft className="size-6 text-fgPrimary opacity-0 group-hover:opacity-100" />
        </button>
        <div
          ref={albumScrollContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-4">
          {isLoading ? (
            <div className="w-full text-center text-fgSecondary">
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
          className="absolute right-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-bgSecondary/70 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollRight(albumScrollContainerRef)}>
          <ArrowRight className="size-6 text-fgPrimary opacity-0 group-hover:opacity-100" />
        </button>
      </div>
      <h1 className="mb-1.5 ml-1 text-2xl font-bold text-fgPrimary">Artist</h1>
      <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-4" />
      <div className="relative mb-8">
        <button
          className="absolute left-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-bgSecondary/70 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollLeft(artistScrollContainerRef)}>
          <ArrowLeft className="size-6 text-fgPrimary opacity-0 group-hover:opacity-100" />
        </button>
        <div
          ref={artistScrollContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-4">
          {isLoading ? (
            <div className="w-full text-center text-fgSecondary">
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
          className="absolute right-0 top-1/2 flex group -translate-y-1/2 z-10 items-center px-2 bg-transparent cursor-pointer hover:bg-bgSecondary/70 h-full transition"
          disabled={isLoading || Object.keys(albums).length === 0}
          onClick={() => handleScrollRight(albumScrollContainerRef)}>
          <ArrowRight className="size-6 text-fgPrimary opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    </>
  );
};

export default Home;
