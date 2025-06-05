"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";
import { List, LayoutGrid, AlignJustify, Heart } from "lucide-react";
import AlbumCard from "../../components/AlbumCard";

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
    return (
      <>
        <div className="flex justify-between">
          <button
            className="mb-4 flex items-center text-fgSecondary w-full hover:text-fgPrimary"
            onClick={() => setSelectedAlbum(null)}>
            <ArrowLeft className="mr-2 size-5" />
            Back to Albums
          </button>
          <div className="flex justify-end gap-4 w-full mb-4 pr-2">
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
        <h2 className="text-2xl ml-1 font-bold mb-2 text-fgPrimary">
          {selectedAlbum}
        </h2>
        <div className="flex flex-col gap-2">
          <div className="px-2 grid grid-cols-12 font-semibold mt-4 text-fgSecondary">
            <span
              className={`${
                selectedAlbumViewMode === "list" ? "col-span-5" : "col-span-4"
              }`}>
              Title
            </span>
            {selectedAlbumViewMode === "compact" && (
              <span className="col-span-3">Artist</span>
            )}
            <span
              className={`${
                selectedAlbumViewMode === "list" ? "col-span-4" : "col-span-3"
              }`}>
              Album
            </span>
            <span>Duration</span>
            <span></span>
          </div>
          <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-2.5" />
          {files.map((file) =>
            selectedAlbumViewMode === "list" ? (
              <div
                key={file.name}
                className="p-2 grid grid-cols-12 items-center w-full bg-bgSecondary cursor-pointer hover:bg-fgTertiary rounded-lg"
                onClick={() => playAudio(file)}>
                <div className="flex gap-4 items-center col-span-5">
                  <img
                    src={file.albumArt}
                    alt={file.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-fgPrimary">
                      {file.name.replace(".mp3", "")}
                    </span>
                    <span className="text-xs text-fgSecondary">
                      {file.artist || "Unknown Artist"}
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <span className="text-sm text-fgSecondary">
                    {file.album || "Unknown Album"}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-fgSecondary">
                    {file.duration || "00:00"}
                  </span>
                </div>
                <div className="place-items-center">
                  <Heart className="size-5 text-fgSecondary cursor-pointer hover:text-accent" />
                </div>
              </div>
            ) : (
              <div
                key={file.name}
                className="p-2 grid grid-cols-12 items-center w-full bg-bgSecondary cursor-pointer hover:bg-fgTertiary rounded-lg"
                onClick={() => playAudio(file)}>
                <div className="col-span-4">
                  <span className="text-sm text-fgPrimary font-semibold">
                    {file.name.replace(".mp3", "")}
                  </span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm text-fgSecondary">
                    {file.artist || "Unknown Artist"}
                  </span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm text-fgSecondary">
                    {file.album || "Unknown Album"}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-fgSecondary">
                    {file.duration || "00:00"}
                  </span>
                </div>
                <div className="place-items-center">
                  <Heart className="size-4 text-fgSecondary cursor-pointer hover:text-accent" />
                </div>
              </div>
            )
          )}
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
