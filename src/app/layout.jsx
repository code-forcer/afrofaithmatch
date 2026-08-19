import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

/* Canela – Serif for headings & emotional weight */
const canela = localFont({
  src: [
    {
      path: "../../public/fonts/canela/CanelaDeck-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-canela",
  display: "swap",
});

/* Inter – Neutral, readable body font */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Afro Faith Match — Where Faith Leads to Meaningful Love",
  description:
    "A trusted Afro Christian community for singles seeking Christ-centered relationships built on faith, purpose, and lifelong commitment.",
  icons: {
    icon: '/logo/afrofaithmatch_logo_icon.png',
    shortcut: '/logo/afrofaithmatch_logo_icon.png',
    apple: '/logo/afrofaithmatch_logo_icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${canela.variable}
          ${inter.variable}
          antialiased
        `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
