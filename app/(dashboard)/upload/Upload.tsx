"use client";
import { useState, useRef } from "react";
import { FilePlus, Trash } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../utils/supabaseClient";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ["audio/mpeg", "audio/mp3"];

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFiles = Array.from(event.target.files || []);
    if (updatedFiles.length === 0) return;

    setFiles((prevFiles) => {
      const newUniqueFiles = updatedFiles.filter(
        (newFile) =>
          !prevFiles.some(
            (f) => f.name === newFile.name && f.size === newFile.size
          )
      );
      return [...prevFiles, ...newUniqueFiles];
    });
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    const invalidFiles = droppedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    let updatedFiles = [...files, ...validFiles];

    setFiles((prevFiles) => {
      const newUniqueFiles = updatedFiles.filter(
        (newFile) =>
          !prevFiles.some(
            (f) => f.name === newFile.name && f.size === newFile.size
          )
      );
      return [...prevFiles, ...newUniqueFiles];
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (const f of files) {
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
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className={`border-2 card hover:bg-bgSecondary rounded-md mx-20 mt-12 items-center justify-center cursor-pointer group gap-1.5 border-dashed px-20 py-8 ${
          dragging ? "border-fgPrimary bg-bgSecondary" : "border-fgSecondary"
        }`}
        onClick={handleButtonClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <button className="btn bg-fgTertiary group-hover:bg-fgSecondary group-hover:text-bgPrimary text-fgPrimary flex w-fit items-center gap-1.5 text-lg font-semibold">
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
          onChange={handleFileSelect}
        />
      </div>
      <div className="flex flex-col p-20 gap-2 pt-4">
        {files.length > 0 && (
          <>
            <span className="text-fgPrimary">Selected Files:</span>
            {files.map((f, index) => (
              <div
                className="flex justify-between"
                key={index}>
                <span className="text-sm">{f.name}</span>
                <Trash
                  className="size-4 text-red-500 cursor-pointer"
                  onClick={() => handleDeleteFile(index)}
                />
              </div>
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
