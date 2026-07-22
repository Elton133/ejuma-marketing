import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Google_Sans_Flex } from "next/font/google";
import { MotionProvider } from "@/providers/MotionProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://beagine.com"),
  title: {
    default: "Beagine — The globally relevant engineering services platform",
    template: "%s — Beagine",
  },
  description:
    "Find, book, and track verified engineering professionals globally. Join the waitlist or install the app.",
  keywords: ["engineering", "specialists", "trades", "booking", "Beagine", "home services", "contractors", "verified professionals"],
  openGraph: {
    title: "Beagine — The Engineering Ecosystem",
    description:
      "Verified engineering professionals. Booked in minutes.",
    url: "https://beagine.com",
    siteName: "Beagine",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beagine — The hands-on workforce",
    description:
      "Verified engineering professionals. Booked in minutes.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://beagine.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${googleSansFlex.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-black font-sans text-white antialiased">
        <CustomCursor />
        <MotionProvider>{children}</MotionProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-PLACEHOLDER"} />
      </body>
    </html>
  );
}
