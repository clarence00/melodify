"use client";
import { useState, useRef } from "react";
import { FilePlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../utils/supabaseClient";

const Upload = () => {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
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
        toast.error(`Error uploading ${f.name}: ${error.message}`);
        console.log("Error uploading file: ", error);
      } else {
        toast.success(`${f.name} uploaded successfully`);
        console.log("File uploaded successfully", data);
      }
    }

    setUploading(false);
    setFile([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
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
    </>
  );
};

export default Upload;
