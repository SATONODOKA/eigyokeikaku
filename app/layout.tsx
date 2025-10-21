import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "営業計画管理システム",
  description: "営業計画と顧客関係のマネジメントシステム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
