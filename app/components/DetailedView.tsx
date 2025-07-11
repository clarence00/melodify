import React from "react";
import {
  Dot,
  ArrowLeft,
  List,
  AlignJustify,
  Play,
  PlusCircle,
} from "lucide-react";
import ListViewDisplay from "./ListViewDisplay";
import CompactViewDisplay from "./CompactViewDisplay";

interface AudioFile {
  name: string;
  album?: string;
  artist?: string;
  albumArt?: string;
  duration?: string;
  publicUrl?: string;
  [key: string]: any;
}

interface DetailViewProps {
  title: string;
  files: AudioFile[];
  viewMode: string;
  setViewMode: (mode: "list" | "compact") => void;
  onBack: () => void;
  playAudio: (files: AudioFile[], startIndex?: number) => void;
  showArtist?: boolean;
}

const durationToSeconds = (duration: string = "0:00") => {
  const parts = duration
    .split(":")
    .map(Number)
    .filter((n) => !isNaN(n));
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
};

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`;
};

const DetailedView = ({
  title,
  files,
  viewMode,
  setViewMode,
  onBack,
  playAudio,
  showArtist = true,
}: DetailViewProps) => {
  const totalDurationSeconds = files.reduce(
    (acc, file) => acc + durationToSeconds(file.duration || "0:00"),
    0
  );
  const totalDurationFormatted = formatDuration(totalDurationSeconds);

  return (
    <div className="flex gap-16">
      <div className="w-full flex flex-col overflow-y-auto">
        <button
          className="mb-2.5 flex items-center text-base-content cursor-pointer w-full hover:text-base-content-200"
          onClick={onBack}>
          <ArrowLeft className="mr-2 size-5" />
          Back to Home
        </button>
        <div className="flex justify-between">
          <h2 className="text-2xl ml-1 font-bold w-full text-base-content">
            {title}
          </h2>
          <div className="flex justify-end gap-4 w-full pr-2">
            <div
              className={`hover:bg-base-300 p-1 rounded-md cursor-pointer h-fit ${
                viewMode === "list"
                  ? "bg-primary text-primary-content pointer-events-none"
                  : "text-base-content-200"
              }`}
              onClick={() => setViewMode("list")}>
              <List className="size-5" />
            </div>
            <div
              className={`hover:bg-base-300 p-1 rounded-md cursor-pointer h-fit ${
                viewMode === "compact"
                  ? "bg-primary text-primary-content pointer-events-none"
                  : "text-base-content-200"
              }`}
              onClick={() => setViewMode("compact")}>
              <AlignJustify className="size-5" />
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center ml-1 text-sm text-base-content-200 mb-2">
          {showArtist && <span>{files[0].artist}</span>}
          {showArtist && <Dot className="size-4" />}
          <span>{files.length} songs</span>
          <Dot className="size-4" />
          <span>{totalDurationFormatted}</span>
        </div>
        <div className="flex flex-col gap-2 pb-2">
          <div className="px-2 grid grid-cols-12 font-semibold mt-4 text-base-content">
            <span className="col-span-6">Title</span>
            <span>Duration</span>
            <span></span>
          </div>
          <div className="h-0.5 bg-neutral w-full rounded-full mb-2.5" />
          {files.map((file, idx) =>
            viewMode === "list" ? (
              <ListViewDisplay
                key={file.name}
                file={file}
                onPlay={() => playAudio(files, idx)}
              />
            ) : (
              <CompactViewDisplay
                key={file.name}
                file={file}
                onPlay={() => playAudio(files, idx)}
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
            className="rounded-full bg-secondary px-4 py-1 flex items-center justify-center w-fit hover:bg-secondary/50 cursor-pointer transition-colors"
            onClick={() => playAudio(files)}>
            <Play
              className="size-5 text-secondary-content"
              fill="oklch(96% 0.018 272.314)"
            />
            <span className="text-secondary-content ml-2 text-xl font-bold">
              Play
            </span>
          </button>
          <button className="rounded-full hover:bg-base-content-200/30 p-1.5 cursor-pointer">
            <PlusCircle className="size-6 text-base-content" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
