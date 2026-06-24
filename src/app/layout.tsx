import type { Metadata } from "next";
import "@/styles/globals.css";
import { TontineProvider } from "@/presentation/context/TontineContext";

export const metadata: Metadata = {
  title: "Lounkap - African Savings & Credit Circles",
  description: "Secure and transparent management of rotary savings and tontines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TontineProvider>
          {children}
        </TontineProvider>
      </body>
    </html>
  );
}
