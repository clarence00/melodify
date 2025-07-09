import { Ellipsis, Heart } from "lucide-react";

interface ListViewSongDetails {
  name: string;
  album?: string;
  artist?: string;
  albumArt?: string;
  duration?: string;
}

interface ListViewDisplayProps {
  file: ListViewSongDetails;
  onPlay: (file: ListViewSongDetails) => void;
  albumDisplay?: boolean;
}

const ListViewDisplay = ({
  file,
  onPlay,
  albumDisplay,
}: ListViewDisplayProps) => {
  const cleanedName = file.name.replace(".mp3", "");

  return (
    <div
      className="p-2 grid grid-cols-12 items-center w-full bg-bgPrimary cursor-pointer hover:bg-fgTertiary rounded-lg"
      onClick={() => onPlay(file)}>
      <div
        className={`flex gap-4 items-center ${
          albumDisplay ? "col-span-5" : "col-span-6"
        }`}>
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
      {albumDisplay && (
        <div className="col-span-4">
          <span className="text-sm text-fgSecondary">
            {file.album || "Unknown Album"}
          </span>
        </div>
      )}
      <div>
        <span className="text-sm text-fgSecondary">
          {file.duration || "00:00"}
        </span>
      </div>
      <div className="flex pr-8 gap-6 justify-end col-span-2">
        <Heart className="size-5 text-fgSecondary cursor-pointer hover:text-accent" />
        <Ellipsis className="size-5 text-fgSecondary cursor-pointer hover:text-accent" />
      </div>
    </div>
  );
};

export default ListViewDisplay;
