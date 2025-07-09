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
      className="p-2 grid grid-cols-12 items-center w-full bg-bgPrimary cursor-pointer hover:bg-fgTertiary rounded-lg"
      onClick={() => onPlay(file)}>
      <div className={` ${albumDisplay ? "col-span-4" : "col-span-6"}`}>
        <span className="text-sm text-fgPrimary font-semibold">
          {file.name.replace(".mp3", "")}
        </span>
      </div>
      {albumDisplay && (
        <>
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
        </>
      )}
      <div>
        <span className="text-sm text-fgSecondary">
          {file.duration || "00:00"}
        </span>
      </div>
      <div className="place-items-center flex gap-6 justify-end pr-2">
        <Heart className="size-4 text-fgSecondary cursor-pointer hover:text-accent" />
        <Ellipsis className="size-4 text-fgSecondary cursor-pointer hover:text-accent" />
      </div>
    </div>
  );
};

export default CompactViewDisplay;
