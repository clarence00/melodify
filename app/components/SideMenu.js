"use client";
import React, { useState } from "react";
import Library from "@/public/icons/library.svg";
import Playlist from "@/public/icons/playlist.svg";
import Upload from "@/public/icons/upload.svg";
import Link from "next/link";

const SideMenu = ({ className }) => {
  const [active, setActive] = useState(null);
  const handleClick = (menuItem) => {
    setActive(menuItem);
  };

  const links = [
    {
      name: "Library",
      icon: <Library style={{ width: "24px", height: "24px" }} />,
      path: "./library",
    },
    {
      name: "Playlist",
      icon: <Playlist style={{ width: "24px", height: "24px" }} />,
      path: "./playlist",
    },
    {
      name: "Upload",
      icon: <Upload style={{ width: "24px", height: "24px" }} />,
      path: "./upload",
    },
  ];

  return (
    <>
      <div className={`left-0 w-[15%] p-1 bg-base-100`}>
        <div className="bg-base-300 h-full rounded-lg flex flex-col gap-4">
          <div className="btn btn-md btn-ghost pl-6 bg-red-600 rounded-b-none border-none shadow-none hover:bg-base-200 justify-start">
            <Library style={{ width: "20px", height: "20px" }} />
            Library
          </div>
          <div className="flex flex-col gap-1 mt-1 px-2 items-start">
            <div className="btn btn-ghost btn-md w-full pl-4 justify-start">
              <Playlist style={{ width: "20px", height: "20px" }} />
              Playlist
            </div>
            <div className="btn btn-ghost btn-md w-full justify-start">
              <Upload style={{ width: "20px", height: "20px" }} />
              Upload
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
