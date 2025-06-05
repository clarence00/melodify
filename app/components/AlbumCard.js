import { useDominantColor } from "../hooks/useDominantColor";

const AlbumCard = ({ albumName, albumArt, artists, onClick }) => {
  const color = useDominantColor(albumArt);

  return (
    <div>
      <div className="px-2 pb-0.5">
        <div
          className="h-1 rounded-t-lg w-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div
        className="cursor-pointer bg-bgSecondary rounded-lg w-32 flex flex-col transition hover:bg-fgTertiary"
        onClick={onClick}>
        <img
          src={albumArt}
          alt={albumName}
          className="w-32 h-32 rounded-lg mb-2 object-cover"
        />
        <span className="text-sm px-2 w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-fgPrimary mb-1">
          {albumName}
        </span>
        <span className="text-xs text-fgSecondary px-2 pb-2">
          {artists.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default AlbumCard;
