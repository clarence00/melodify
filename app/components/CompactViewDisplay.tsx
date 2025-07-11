import { Ellipsis, Heart } from "lucide-react";

interface CompactViewSongDetails {
  name: string;
  album?: string;
  artist?: string;
  albumArt?: string;
  duration?: string;
}

interface CompactViewDisplayProps {
  file: CompactViewSongDetails;
  onPlay: (file: CompactViewSongDetails) => void;
  albumDisplay?: boolean;
}

const CompactViewDisplay = ({
  file,
  onPlay,
  albumDisplay,
}: CompactViewDisplayProps) => {
  return (
    <div
      className="p-2 grid grid-cols-12 items-center w-full bg-base-200 cursor-pointer hover:bg-base-300 rounded-lg"
      onClick={() => onPlay(file)}>
      <div className={` ${albumDisplay ? "col-span-4" : "col-span-6"}`}>
        <span className="text-sm text-base-content font-semibold">
          {file.name.replace(".mp3", "")}
        </span>
      </div>
      {albumDisplay && (
        <>
          <div className="col-span-3">
            <span className="text-sm text-base-content-200">
              {file.artist || "Unknown Artist"}
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-sm text-base-content-200">
              {file.album || "Unknown Album"}
            </span>
          </div>
        </>
      )}
      <div>
        <span className="text-sm text-base-content-200">
          {file.duration || "00:00"}
        </span>
      </div>
      <div className="place-items-center flex gap-6 justify-end pr-2">
        <Heart className="size-4 text-base-content-200 cursor-pointer hover:text-success" />
        <Ellipsis className="size-4 text-base-content-200 cursor-pointer hover:text-success" />
      </div>
    </div>
  );
};

export default CompactViewDisplay;
