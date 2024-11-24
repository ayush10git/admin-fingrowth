// import Navbar from "@/components/Navbar";
// import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const denton = localFont({
  src: [
    { path: "../public/fonts/Denton Test Black 900.otf", weight: "900" },
    { path: "../public/fonts/Denton Test Bold 700.otf", weight: "700" },
    { path: "../public/fonts/Denton Test ExtraBold 800.otf", weight: "800" },
    { path: "../public/fonts/Denton Test Light 300.otf", weight: "300" },
    { path: "../public/fonts/Denton Test Medium 500.otf", weight: "500" },
    { path: "../public/fonts/Denton Test Thin 100.otf", weight: "100" },
  ],
  variable: "--font-denton",
});

const gilroy = localFont({
  src: [
    { path: "../public/fonts/Gilroy-Thin.ttf", weight: "100" },
    { path: "../public/fonts/Gilroy-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Gilroy-Bold.ttf", weight: "700" },
    { path: "../public/fonts/Gilroy-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Gilroy-SemiBold.ttf", weight: "600" },
  ],
  variable: "--font-gilroy",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${denton.variable} ${gilroy.variable}`}>
        {children}
      </body>
    </html>
  );
}
