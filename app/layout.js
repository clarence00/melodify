import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

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
        className={`${typeface.className} antialiased`}
        data-theme="lofi">
        {children}
      </body>
    </html>
  );
}
