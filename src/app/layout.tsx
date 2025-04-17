import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navBarHorizon/navBar";
import RotatingText from "@/app/components/rotatingFooter/rotatingFooter";
import ScanlineOverlay from '@/app/components/scanlineOverlay/scanlineOverlay';  // Import the ScanlineOverlay component
import StoreProvider from "./StoreProvider";
import PowerButton from "./components/powerButton/powerButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app, in refactor period.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* wrap everything in Provider */}
        <StoreProvider>
          <RenderWrapper>
            {/* Navbar (fixed at the top) */}        
            <div className="fixed top-0 left-0 w-full h-30 bg-black/95 bg-blend- z-50 transform isolate shadow-[0_0_20px_2px_rgba(0,255,125,0.2)]">
              <PowerButton />
              <div className="opacity-100">
                <header className="relative top-0 left-0 w-full h-8 mt-11 bg-gradient-to-r from-zinc-800/20 to-black/90 overflow-hidden shadow-[0_0_4px_1px_rgba(0,255,125,0.2)] pl-3 z-10 ">
                  <Navbar />
                </header>
              </div>
            </div>
            {/* Wrapping children with ScanlineOverlay */}
            <ScanlineOverlay>
              {children}  {/* Pass content to ScanlineOverlay */}
            </ScanlineOverlay>
            <footer className="fixed bg-blend bottom-0 left-0 w-full h-16 bg-black/90 flex justify-center items-center z-50 shadow-[0_0_20px_2px_rgba(0,255,125,0.2)]">
              <p className="relative min-w-[200px] text-center">CC-BY-NC-SA 2025 <RotatingText /></p>
            </footer>
          </RenderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
