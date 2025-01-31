import React from "react";
import Home from "@/public/icons/home.svg";
import Search from "@/public/icons/search.svg";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="bg-base-100 navbar min-h-3 p-0 flex">
        <div className="btn btn-ghost w-[15%] pl-6 bg-red-600 m-1 justify-start">
          <Home style={{ width: "20px", height: "20px" }} />
          Home
        </div>
        <div className="btn btn-ghost w-[15%] pl-6 bg-red-600 m-1 justify-start">
          <Search style={{ width: "20px", height: "20px" }} />
          Search
        </div>
      </div>
    </>
  );
};

export default Header;
