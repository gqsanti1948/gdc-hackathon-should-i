import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Should I?",
  description: "Cosmic rulings for earthly decisions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
