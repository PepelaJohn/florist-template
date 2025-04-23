import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | Luxury Flowers`,
  description: 'Shop beautiful luxury flowers with next day delivery. Fresh flowers for any occasion.',
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_NAME} | Luxury Flowers`,
    description: 'Shop beautiful luxury flowers with next day delivery. Fresh flowers for any occasion.',
    url: 'https://bloomnpetal-shop.netlify.app/', // Replace with your actual URL
    siteName: process.env.NEXT_PUBLIC_NAME || 'Luxury Flowers',
    images: [
      {
        url: 'https://bloomnpetal-shop.netlify.app/preview.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Luxury Flowers – Fresh blooms delivered',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title:  `${process.env.NEXT_PUBLIC_NAME} | Luxury Flowers`,
    description: 'Shop beautiful luxury flowers with next day delivery. Fresh flowers for any occasion.',
    images: ['https://bloomnpetal-shop.netlify.app/preview.png'],
  },
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
        <CartProvider>
        
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
