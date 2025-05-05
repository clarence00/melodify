"use client";
import { useState, useEffect, useRef } from "react";
import { FilePlus } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";
import * as mm from "music-metadata-browser";

const Upload = () => {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
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

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (file.length === 0) return;
    setUploading(true);

    for (const f of file) {
      const { data, error } = await supabase.storage
        .from("music")
        .upload(`uploads/${f.name}`, f);
      if (error) {
        console.log("Error uploading file: ", error);
      } else {
        console.log("File uploaded successfully", data);
      }
    }
    await fetchUploadedFiles();
    setUploading(false);
    setFile([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-full w-full">
      <div className="border-fgSecondary border-2 card hover:bg-bgSecondary rounded-md mx-20 mt-12 items-center justify-center cursor-pointer group gap-1.5 border-dashed px-20 py-8">
        <button
          className="btn bg-fgTertiary group-hover:bg-fgSecondary group-hover:text-bgPrimary text-fgPrimary flex w-fit items-center gap-1.5 text-lg font-semibold"
          onClick={handleButtonClick}>
          <FilePlus className="size-5" />
          Choose Files
        </button>
        <span className="text-fgPrimary font-semibold">
          or drop your files here
        </span>
        <input
          type="file"
          hidden
          multiple
          ref={fileInputRef}
          accept=".mp3"
          onChange={(e) => setFile(Array.from(e.target.files))}
        />
      </div>
      <div className="flex flex-col pl-20 gap-2 pt-4">
        {file.length > 0 && (
          <>
            <span className="text-fgPrimary">Selected Files:</span>
            {file.map((f, index) => (
              <span
                className="text-sm"
                key={index}>
                {f.name}
              </span>
            ))}
            <button
              className={`mt-4 w-fit text-bgSecondary font-semibold hover:bg-green-600 px-4 py-1.5 rounded-md ${
                uploading
                  ? "pointer-events-none bg-fgTertiary"
                  : "bg-accent pointer-events-auto"
              }`}
              onClick={handleUpload}>
              Upload
            </button>
          </>
        )}
      </div>
      {/* {audioFiles.length > 0 ? (
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
      )} */}
    </div>
  );
};

export default Upload;
