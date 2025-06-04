import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import * as mm from "music-metadata-browser";

const formatDuration = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const useFetchAudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUploadedFiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("music")
        .list("uploads");

      if (error) {
        console.error("Error fetching files: ", error);
        return;
      }

      const filesWithMetadata = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = supabase.storage
            .from("music")
            .getPublicUrl(`uploads/${file.name}`);

          const response = await fetch(urlData.publicUrl);
          const blob = await response.blob();
          const metadata = await mm.parseBlob(blob);
          const artist = metadata.common.artist || "Unknown Artist";
          const album = metadata.common.album || "Unknown Album";
          const albumArt =
            metadata.common.picture?.[0] &&
            URL.createObjectURL(
              new Blob([new Uint8Array(metadata.common.picture[0].data)])
            );
          const duration = formatDuration(metadata.format.duration || 0);

          return {
            ...file,
            publicUrl: urlData.publicUrl,
            album,
            artist,
            albumArt,
            duration,
          };
        })
      );

      setAudioFiles(filesWithMetadata);
    } catch (error) {
      console.error("Error processing files: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return { audioFiles, isLoading };
};
