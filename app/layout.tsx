import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "Expert-On-Demand Diagnostics",
  description: "Real-time, verifiable expert diagnostics for complex equipment",
  openGraph: {
    title: "Expert-On-Demand Diagnostics",
    description: "Real-time, verifiable expert diagnostics for complex equipment",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
