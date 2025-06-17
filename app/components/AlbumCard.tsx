import { Music } from "lucide-react";
import useDominantColor from "../hooks/useDominantColor";

interface AlbumCardProps {
  albumName: string;
  albumArt?: string;
  artists?: string[];
  onClick: () => void;
}

const AlbumCard = ({
  albumName,
  albumArt,
  artists,
  onClick,
}: AlbumCardProps) => {
  const color = albumArt ? useDominantColor({ imageUrl: albumArt }) : "#323232";

  return (
    <div>
      <div className="px-2 pb-0.5">
        <div
          className="h-1 rounded-t-lg w-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div
        className="cursor-pointer bg-bgSecondary rounded-lg w-32 flex flex-col transition group hover:bg-fgTertiary"
        onClick={onClick}>
        {albumArt ? (
          <img
            src={albumArt}
            alt={albumName}
            className="w-32 h-32 rounded-lg mb-2 object-cover"
          />
        ) : (
          <div className="rounded-lg bg-fgTertiary flex items-center justify-center w-32 h-32 mb-2">
            <Music className="size-16 text-fgPrimarys" />
          </div>
        )}
        <span className="text-sm px-2 w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-fgPrimary mb-1">
          {albumName}
        </span>
        <span className="text-xs text-fgSecondary px-2 pb-2">
          {artists && artists.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default AlbumCard;
