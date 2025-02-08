"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SideMenuUI from "../ui/SideMenuUI";

const SideMenu = () => {
  const pathname = usePathname();
  const links = ["/library", "/playlist", "/upload"];
  const isActive = links.includes(pathname);

  return (
    <>
      <SideMenuUI
        pathname={pathname}
        links={links}
        isActive={isActive}
      />
    </>
  );
};

export default SideMenu;
