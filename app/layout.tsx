import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "~/s · pcstyle",
  description: "short links for pcstyle.dev.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "~/s · pcstyle",
    description: "short links for pcstyle.dev.",
    url: "https://s.pcstyle.dev",
    siteName: "s.pcstyle.dev",
    images: [
      {
        url: "https://og.pcstyle.dev/api/og?title=LINK%20SHORTENER&subtitle=Cybernetic%20URL%20Compression&icon=link&theme=magenta",
        width: 1200,
        height: 630,
        alt: "s.pcstyle.dev",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "~/s · pcstyle",
    description: "short links for pcstyle.dev.",
    images: ["https://og.pcstyle.dev/api/og?title=LINK%20SHORTENER&subtitle=Cybernetic%20URL%20Compression&icon=link&theme=magenta"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
