import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sylhet Advocate Directory",
  description: "Directory of advocates in Sylhet - Built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
