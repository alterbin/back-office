import type { Metadata } from "next";
import localFont from "next/font/local";
import "../assets/styles/globals.css";
import "../assets/styles/main.scss";
import Provider from "@/providers";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin App",
  description: "Alterbin back-office app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#363636",
            },
          }}
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
