"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import * as mm from "music-metadata-browser";

const Library = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
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
        const albumArt =
          metadata.common.picture?.[0] &&
          URL.createObjectURL(new Blob([metadata.common.picture[0].data]));

        return {
          ...file,
          publicUrl: urlData.publicUrl,
          artist,
          albumArt,
        };
      })
    );
    setAudioFiles(filesWithMetadata);
  };

  return (
    <div className="max-h-full w-full p-4">
      {audioFiles.length > 0 ? (
        audioFiles.map((file) => (
          <div
            key={file.name}
            className="mb-4 p-4 bg-white rounded shadow flex items-center gap-4">
            {file.albumArt ? (
              <img
                src={file.albumArt}
                alt="Album Art"
                className="w-16 h-16 rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                No Art
              </div>
            )}
            <div className="w-full">
              <p className="font-medium">{file.name}</p>
              <p className="text-gray-600">{file.artist}</p>

              <audio
                controls
                src={file.publicUrl}
                className="w-full mt-2"
              />
            </div>
          </div>
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default Library;
