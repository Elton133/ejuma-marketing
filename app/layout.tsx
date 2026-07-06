import type { Metadata } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import { MotionProvider } from "@/providers/MotionProvider";
import { InitialLoader } from "@/components/InitialLoader";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  adjustFontFallback: false,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beagine.com"),
  title: {
    default: "Beagine — Ghana's skilled trades marketplace",
    template: "%s — Beagine",
  },
  description:
    "Find, book, and track verified plumbers, electricians, masons, and more in Greater Accra. Join the waitlist or install the app.",
  openGraph: {
    title: "Beagine — The hands-on workforce",
    description:
      "Verified tradespeople. Booked in minutes. Tema, Dawhenya, Prampram and nearby.",
    url: "https://beagine.com",
    siteName: "Beagine",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beagine — The hands-on workforce",
    description:
      "Verified tradespeople. Booked in minutes. Tema, Dawhenya, Prampram and nearby.",
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
      lang="en-GH"
      className={`${bigShoulders.variable} ${manrope.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-black font-sans text-white antialiased">
        <InitialLoader />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
