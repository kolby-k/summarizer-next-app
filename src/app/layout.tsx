import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import SessionProvider from "@/context/sessionContext";
import { getSession } from "@/lib/session/getSession";
import SessionInfo from "@/components/SessionInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarizer",
  description: "Summarize web articles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const safeSession = session ? { ...session } : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider initialSession={safeSession}>
          <Header />
          <SessionInfo />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
