"use client";
import { usePathname } from "next/navigation";
import { House, Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const links = ["/", "/search"];

  return (
    <div className="bg-base-100 navbar p-0 flex h-fit">
      <Link
        href={links[0]}
        className={`btn w-[15%] border-none pl-6 m-2 ml-1 justify-start hover:bg-base-300 ${
          pathname === links[0]
            ? "bg-primary text-base-content pointer-events-none"
            : "bg-base-100 text-base-content-200"
        }`}>
        <House
          className={`${
            pathname === links[0]
              ? "text-base-content"
              : "text-base-content-200"
          }`}
          size={20}
        />
        Home
      </Link>
      <Link
        href={links[1]}
        className={`btn w-[15%] border-none pl-6 m-2 ml-1 justify-start hover:bg-base-300 ${
          pathname === links[1]
            ? "bg-primary text-base-content pointer-events-none"
            : "bg-base-100 text-base-content-200"
        }`}>
        <Search
          className={`${
            pathname === links[1]
              ? "text-base-content"
              : "text-base-content-200"
          }`}
          size={20}
        />
        Search
      </Link>
    </div>
  );
};

export default Header;
