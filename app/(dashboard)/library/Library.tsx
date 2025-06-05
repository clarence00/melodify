"use client";
import { useState } from "react";
import { Heart, AlignJustify, List } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";

const Library = () => {
  const { audioFiles, isLoading } = useFetchAudioFiles();
  const { playAudio } = useAudio();
  const [viewMode, setViewMode] = useState("list");

  return (
    <>
      <div className="flex justify-end gap-4 w-full mb-4 pr-2">
        <div
          className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
            viewMode === "list"
              ? "bg-bgSecondary text-fgPrimary pointer-events-none"
              : "text-fgSecondary"
          }`}
          onClick={() => setViewMode("list")}>
          <List className="size-5" />
        </div>
        <div
          className={`hover:bg-fgTertiary p-1 rounded-md cursor-pointer ${
            viewMode === "compact"
              ? "bg-bgSecondary text-fgPrimary pointer-events-none"
              : "text-fgSecondary"
          }`}
          onClick={() => setViewMode("compact")}>
          <AlignJustify className="size-5" />
        </div>
      </div>
      {isLoading ? (
        <div className="w-full text-center text-fgSecondary">
          Fetching music...
        </div>
      ) : audioFiles.length > 0 ? (
        <>
          <div className="flex-col flex gap-2">
            <div className="px-2 grid grid-cols-12 font-semibold text-fgSecondary">
              <span
                className={`${
                  viewMode === "list" ? "col-span-5" : "col-span-4"
                }`}>
                Title
              </span>
              {viewMode === "compact" && (
                <span className="col-span-3">Artist</span>
              )}
              <span
                className={`${
                  viewMode === "list" ? "col-span-4" : "col-span-3"
                }`}>
                Album
              </span>
              <span>Duration</span>
              <span></span>
            </div>
            <div className="h-0.5 bg-fgTertiary w-full rounded-full mb-2.5" />
            {audioFiles.map((file) =>
              viewMode === "list" ? (
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
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </>
  );
};

export default Library;
