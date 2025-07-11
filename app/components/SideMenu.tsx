"use client";
import React from "react";
import { LibrarySquare, ListMusic, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const pathname = usePathname();
  const links = ["/library", "/playlist", "/upload"];
  const isActive = links.includes(pathname);

  return (
    <>
      <div className="left-0 min-w-[15%] max-w-[15%] py-3 p-2">
        <div
          className={`h-full rounded-lg flex flex-col gap-4 ${
            isActive ? "bg-base-200" : "bg-base-100"
          }`}>
          <Link href={links[0]}>
            <div
              className={`btn btn-md pl-6 w-full rounded-b-none border-none shadow-none hover:bg-base-300 justify-start ${
                pathname === links[0]
                  ? "text-base-content"
                  : "text-base-content-200"
              } ${isActive ? "bg-base-200" : "bg-base-100"} `}>
              <LibrarySquare
                className={`${
                  pathname === links[0]
                    ? "text-base-content"
                    : "text-base-content-200"
                }`}
                size={20}
              />
              Library
            </div>
          </Link>
          <div className="flex flex-col gap-2 mt-3 px-2 items-start">
            <Link
              href={links[1]}
              className={`btn border-none w-full pl-4 justify-start hover:bg-base-300 ${
                pathname === links[1]
                  ? "bg-primary pointer-events-auto text-base-content"
                  : "bg-transparent text-base-content-200"
              }`}>
              <ListMusic
                className={`${
                  pathname === links[1]
                    ? "text-base-content"
                    : "text-base-content-200"
                }`}
                size={20}
              />
              Playlist
            </Link>
            <Link
              href={links[2]}
              className={`btn btn-md border-none w-full pl-4 justify-start hover:bg-base-300 ${
                pathname === links[2]
                  ? "bg-primary pointer-events-none text-base-content"
                  : "bg-transparent text-base-content-200"
              }`}>
              <Upload
                className={`${
                  pathname === links[2]
                    ? "text-base-content"
                    : "text-base-content-200"
                }`}
                size={20}
              />
              Upload
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
