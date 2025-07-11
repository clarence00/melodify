"use client";
import { useState } from "react";
import { AlignJustify, List } from "lucide-react";
import { useAudio } from "../../context/AudioContext";
import useFetchAudioFiles from "../../hooks/useFetchAudioFiles";
import ListViewDisplay from "../../components/ListViewDisplay";
import CompactViewDisplay from "../../components/CompactViewDisplay";

const Library = () => {
  const { audioFiles, isLoading } = useFetchAudioFiles();
  const { playAudio } = useAudio();
  const [viewMode, setViewMode] = useState("list");

  return (
    <>
      <div className="flex justify-end gap-4 w-full mb-4 pr-2">
        <div
          className={`hover:bg-base-300 p-1 rounded-md cursor-pointer ${
            viewMode === "list"
              ? "bg-primary text-primary-content pointer-events-none"
              : "text-base-content-200"
          }`}
          onClick={() => setViewMode("list")}>
          <List className="size-5" />
        </div>
        <div
          className={`hover:bg-base-300 p-1 rounded-md cursor-pointer ${
            viewMode === "compact"
              ? "bg-primary text-primary-content pointer-events-none"
              : "text-base-content-200"
          }`}
          onClick={() => setViewMode("compact")}>
          <AlignJustify className="size-5" />
        </div>
      </div>
      {isLoading ? (
        <div className="w-full text-center text-base-content">
          Fetching music...
        </div>
      ) : audioFiles.length > 0 ? (
        <>
          <div className="flex-col flex gap-2 pb-2">
            <div className="px-2 grid grid-cols-12 font-semibold text-base-content">
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
            <div className="h-0.5 bg-neutral w-full rounded-full mb-2.5" />
            {audioFiles.map((file, idx) =>
              viewMode === "list" ? (
                <ListViewDisplay
                  key={file.name}
                  file={file}
                  onPlay={() => playAudio(audioFiles, idx)}
                  albumDisplay={true}
                />
              ) : (
                <CompactViewDisplay
                  key={file.name}
                  file={file}
                  onPlay={() => playAudio(audioFiles, idx)}
                  albumDisplay={true}
                />
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
