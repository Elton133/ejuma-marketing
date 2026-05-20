import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ejuma — Ghana's skilled trades marketplace",
  description:
    "Find, book, and track verified plumbers, electricians, masons, and more in Greater Accra. Join the waitlist or install the 3juma app.",
  themeColor: "#FF5F15",
  openGraph: {
    title: "Ejuma — The hands-on workforce",
    description:
      "Verified tradespeople. Booked in minutes. Tema, Dawhenya, Prampram and nearby.",
    url: "https://3juma.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GH" className={`${instrumentSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-black font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
