"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderUI from "../ui/HeaderUI";

const Header = () => {
  const pathname = usePathname();
  const links = ["/", "/search"];

  return (
    <HeaderUI
      pathname={pathname}
      links={links}
    />
  );
};

export default Header;
