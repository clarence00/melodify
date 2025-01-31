import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

const typeface = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Melodify - Personal Music Player",
  description: "My Perosonal Music Player",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${typeface.className} antialiased flex h-screen`}
        data-theme="lofi">
        <SideMenu />
        <div className="flex flex-col grow">
          <Header />
          <div className="grow m-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
