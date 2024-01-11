"use client";
import { useState } from 'react';
import { Inter } from 'next/font/google';
import { GameContext } from "./resources/contexts";
import { MantineProvider } from "@mantine/core";
import './globals.css'
import "@mantine/core/styles.css";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  const [artistName, setArtistName] = useState<string>("");
  const [artistId, setArtistId] = useState<string>("");


  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <GameContext.Provider value={{ artistName, setArtistName, artistId, setArtistId }}>

            {children}

          </GameContext.Provider>
        </MantineProvider>
      </body>
    </html >
  )
}
