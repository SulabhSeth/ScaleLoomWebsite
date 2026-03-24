import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Navbar from "./components/Navbar"; // ✅ add this

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F6F7FB] text-gray-800`}>

        {/* ✅ GLOBAL NAVBAR */}
        <Navbar />

        {/* ✅ PAGE CONTENT */}
        <main className="pt-28">
          {children}
        </main>

      </body>
    </html>
  );
}