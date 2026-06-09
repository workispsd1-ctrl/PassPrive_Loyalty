import type { Metadata } from "next";
import { Albert_Sans, Familjen_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "PassPrivé Loyalty",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${albertSans.variable} ${familjenGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col text-foreground font-sans antialiased" suppressHydrationWarning>
        <div aria-hidden className="app-background pointer-events-none fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
