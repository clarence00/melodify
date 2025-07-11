import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Player from "./components/Player";
import { AudioProvider } from "./context/AudioContext";
import { Toaster } from "sonner";

const typeface = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Melodify - Personal Music Player",
  description: "My Personal Music Player",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${typeface.className} antialiased flex h-screen bg-base-100`}
        data-theme="melodify">
        <AudioProvider>
          <SideMenu />
          <div className="flex flex-col grow overflow-hidden">
            <Header />
            <div className="grow ml-1 mt-1 mb-2 mr-3 border-2 rounded-lg border-neutral overflow-y-auto h-full">
              {children}
              <Toaster position="top-right" />
            </div>
            <div className="h-24 ml-1 mr-3 mb-2 rounded-lg bg-neutral">
              <Player />
            </div>
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
