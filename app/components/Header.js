"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { House, Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const links = ["/", "/search"];
  return (
    <>
      <div className="bg-bgMain navbar min-h-3 p-0 flex">
        <Link
          href={links[0]}
          className={`btn w-[15%] border-none pl-6 m-2 ml-1 justify-start hover:bg-bgSecondary/[0.9] ${
            pathname === links[0]
              ? "bg-bgSecondary text-fgPrimary"
              : "bg-bgMain text-fgSecondary"
          }`}>
          <House
            color={pathname === links[0] ? "#E0E0E0" : "#898989"}
            size={20}
          />
          Home
        </Link>
        <Link
          href={links[1]}
          className={`btn w-[15%] border-none pl-6 m-2 ml-1 justify-start hover:bg-bgSecondary/[0.9] ${
            pathname === links[1]
              ? "bg-bgSecondary text-fgPrimary"
              : "bg-bgMain text-fgSecondary"
          }`}>
          <Search
            color={pathname === links[1] ? "#E0E0E0" : "#898989"}
            size={20}
          />
          Search
        </Link>
      </div>
    </>
  );
};

export default Header;
