import type { Metadata } from "next";
import { Big_Shoulders, Google_Sans_Flex } from "next/font/google";
import { MotionProvider } from "@/providers/MotionProvider";
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

export const metadata: Metadata = {
  title: "Beagine — Ghana's skilled trades marketplace",
  description:
    "Find, book, and track verified plumbers, electricians, masons, and more in Greater Accra. Join the waitlist or install the app.",
  themeColor: "#FF5F15",
  openGraph: {
    title: "Beagine — The hands-on workforce",
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
    <html
      lang="en-GH"
      className={`${bigShoulders.variable} ${googleSansFlex.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-black font-sans text-white antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
