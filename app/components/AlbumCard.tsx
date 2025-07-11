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
  const color = albumArt
    ? useDominantColor({ imageUrl: albumArt })
    : "oklch(55% 0.046 257.417)";

  return (
    <div>
      <div className="px-2 pb-0.75">
        <div
          className="h-1 rounded-t-lg w-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div
        className="cursor-pointer bg-base-200 rounded-lg w-32 flex flex-col transition group hover:bg-base-300"
        onClick={onClick}>
        {albumArt ? (
          <img
            src={albumArt}
            alt={albumName}
            className="w-32 h-32 rounded-lg mb-2 object-cover"
          />
        ) : (
          <div className="rounded-lg bg-primary flex items-center justify-center w-32 h-32 mb-2">
            <Music className="size-16 text-primary-content" />
          </div>
        )}
        <span className="text-sm px-2 w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-primary-content mb-1">
          {albumName}
        </span>
        <span className="text-xs text-base-content-200 px-2 pb-2">
          {artists && artists.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default AlbumCard;
