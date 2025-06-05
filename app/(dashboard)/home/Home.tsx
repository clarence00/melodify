"use client";
import { useState } from "react";
import { ArrowLeft, Dot, Play, Plus, PlusCircle } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";
import { List, LayoutGrid, AlignJustify, Heart } from "lucide-react";
import AlbumCard from "../../components/AlbumCard";
import ListViewDisplay from "../../components/ListViewDisplay";
import CompactViewDisplay from "../../components/CompactViewDisplay";

const Home = () => {
  const { audioFiles, isLoading } = useFetchAudioFiles();
  const { playAudio } = useAudio();
  const [albumViewMode, setAlbumViewMode] = useState("grid");
  const [selectedAlbumViewMode, setSelectedAlbumViewMode] = useState("list");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const albums = audioFiles.reduce<Record<string, typeof audioFiles>>(
    (acc, file) => {
      const album = file.album || "Unknown Album";
      if (!acc[album]) acc[album] = [];
      acc[album].push(file);
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
              Back to Albums
            </button>
            <div className="flex justify-between">
              <h2 className="text-2xl ml-1 font-bold w-full text-fgPrimary">
                {selectedAlbum}
              </h2>
              <div className="flex justify-end gap-4 w-full pr-2">
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
                    selectedAlbumViewMode === "list"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setSelectedAlbumViewMode("list")}>
                  <List className="size-5" />
                </div>
                <div
                  className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
                    selectedAlbumViewMode === "compact"
                      ? "bg-bgSecondary text-fgPrimary pointer-events-none"
                      : "text-fgSecondary"
                  }`}
                  onClick={() => setSelectedAlbumViewMode("compact")}>
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
                    selectedAlbumViewMode === "list"
                      ? "col-span-6"
                      : "col-span-6"
                  }`}>
                  Title
                </span>
                <span>Duration</span>
                <span></span>
              </div>
              <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-2.5" />
              {files.map((file) =>
                selectedAlbumViewMode === "list" ? (
                  <ListViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={playAudio}
                  />
                ) : (
                  <CompactViewDisplay
                    key={file.name}
                    file={file}
                    onPlay={playAudio}
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
              <button className="rounded-full bg-accent px-4 py-1 flex items-center justify-center w-fit hover:bg-accent/80 transition-colors">
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
      <div className="flex justify-end gap-4 w-full mb-4 pr-2">
        <div
          className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
            albumViewMode === "grid"
              ? "bg-bgSecondary text-fgPrimary pointer-events-none"
              : "text-fgSecondary"
          }`}
          onClick={() => setAlbumViewMode("grid")}>
          <LayoutGrid className="size-5" />
        </div>
        <div
          className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
            albumViewMode === "list"
              ? "bg-bgSecondary text-fgPrimary pointer-events-none"
              : "text-fgSecondary"
          }`}
          onClick={() => setAlbumViewMode("list")}>
          <List className="size-5" />
        </div>
      </div>
      <h1 className="mb-1.5 ml-1 text-2xl font-bold text-fgPrimary">Albums</h1>
      <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-4" />
      {/* Albums */}
      <div className="flex flex-wrap gap-4">
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
    </>
  );
};

export default Home;
