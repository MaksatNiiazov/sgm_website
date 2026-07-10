import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strawberry-glam-models.maksat07.chatgpt.site"),
  title: "Strawberry Glam Models",
  description:
    "Exclusive bilingual webcam model recruitment agency for premium clients from New Zealand and Australia.",
  applicationName: "Strawberry Glam Models",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Strawberry Glam Models",
    description:
      "Private, premium bilingual model recruitment with safety-first review, exclusive NZ & Australia audience, and relocation opportunities.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Strawberry Glam Models premium black and silver brand visuals",
      },
    ],
    siteName: "Strawberry Glam Models",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strawberry Glam Models",
    description:
      "Private, premium bilingual model recruitment with safety-first review and relocation opportunities.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#030303" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
