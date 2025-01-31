"use client";
import React from "react";
import { LibrarySquare, ListMusic, Upload } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideMenu = () => {
  const pathname = usePathname(null);
  const links = ["/library", "/playlist", "/upload"];
  const isActive = links.includes(pathname);

  return (
    <>
      <div className={`left-0 w-[15%] p-2`}>
        <div
          className={`h-full rounded-lg flex flex-col gap-4 ${
            isActive
              ? "bg-bgPrimary text-fgPrimary"
              : "bg-bgMain text-fgSecondary"
          }`}>
          <Link href={links[0]}>
            <div
              className={`btn btn-md pl-6 w-full rounded-b-none border-none shadow-none hover:bg-bgSecondary/[0.9] justify-start ${
                pathname === links[0] ? "text-fgPrimary" : "text-fgSecondary"
              } ${isActive ? "bg-bgPrimary" : "bg-bgMain"} `}>
              <LibrarySquare
                color={pathname === links[0] ? "#E0E0E0" : "#898989"}
                size={20}
              />
              Library
            </div>
          </Link>
          <div className="flex flex-col gap-1 mt-1 px-2 items-start">
            <Link
              href={links[1]}
              className={`btn btn-md border-none w-full pl-4 justify-start hover:bg-bgSecondary/[0.9] ${
                pathname === links[1]
                  ? "bg-btnActive text-fgPrimary"
                  : "bg-transparent text-fgSecondary"
              }`}>
              <ListMusic
                color={pathname === links[1] ? "#E0E0E0" : "#898989"}
                size={20}
              />
              Playlist
            </Link>
            <Link
              href={links[2]}
              className={`btn btn-md border-none w-full pl-4 justify-start hover:bg-bgSecondary/[0.9] ${
                pathname === links[2]
                  ? "bg-btnActive text-fgPrimary"
                  : "bg-transparent text-fgSecondary"
              }`}>
              <Upload
                color={pathname === links[2] ? "#E0E0E0" : "#898989"}
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
