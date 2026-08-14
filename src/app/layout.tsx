import type { Metadata } from "next";
import { Epilogue, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patient Manager",
  description: "Clinical patient management dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${epilogue.variable} ${geistMono.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
