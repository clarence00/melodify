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
        className={`${typeface.className} antialiased flex h-screen bg-bgMain`}
        data-theme="lofi">
        <SideMenu />
        <div className="flex flex-col grow">
          <Header />
          <div className="grow ml-1 mt-1 mb-2 mr-3 border-2 rounded-lg border-bgSecondary">
            {children}
          </div>
          <div className="h-16 ml-1 mr-3 mb-2 rounded-lg bg-bgSecondary">
            PLAYER
          </div>
        </div>
      </body>
    </html>
  );
}
