import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/context/SessionContext";
import { getSession } from "@/lib/session";
import { SummaryProvider } from "@/context/SummarizeContext";

const mainFont = Roboto({
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-1",
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
  let safeSession;

  if (!session) {
    safeSession = null;
  } else {
    safeSession = { createdTime: Date.now() };
  }

  return (
    <html lang="en">
      <body className={`${mainFont.variable} antialiased`}>
        <SessionProvider initialSession={safeSession}>
          <SummaryProvider>{children}</SummaryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
