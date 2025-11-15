import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sylhet Advocates Directory | Find Legal Advocates in Sylhet, Bangladesh",
    template: "%s | Sylhet Advocates"
  },
  description: "Connect with experienced legal advocates in Sylhet, Bangladesh. Search and filter by practice area, experience, location, and more. Find the perfect legal professional for your case.",
  keywords: ["advocates", "lawyers", "legal", "Sylhet", "Bangladesh", "law", "attorney", "legal services"],
  authors: [{ name: "Sylhet Advocates Directory" }],
  openGraph: {
    title: "Sylhet Advocates Directory",
    description: "Find experienced legal advocates in Sylhet, Bangladesh",
    type: "website",
  },
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
