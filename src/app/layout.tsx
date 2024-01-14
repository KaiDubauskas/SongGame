"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { GameContext } from "./resources/contexts";
import { MantineProvider } from "@mantine/core";
import { Button, TextInput, Stepper, Group } from "@mantine/core";
import './globals.css';
import "@mantine/core/styles.css";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ artist, configure, mode }: {
  artist: React.ReactNode,
  configure: React.ReactNode,
  mode: React.ReactNode,
}) {
  const router = useRouter();
  const [artistName, setArtistName] = useState<string>("");
  const [artistId, setArtistId] = useState<string>("");
  const [progressIdx, setProgressIdx] = useState<number>(0);

  /**
   * Eventually have a state for game type set in mode. Based on this, here we will route
   * to a different /config folder. So there will be multiple /configs within @config. 
   */

  useEffect(() => {
    console.log(progressIdx)
    if (progressIdx > 3 || progressIdx < 0) {
      setProgressIdx(progressIdx > 3 ? 3 : 0);
      return;
    }

    if (progressIdx == 2)
      router.push(`/configure`);
    else if (progressIdx == 1)
      router.push(`/mode`);
    else if (progressIdx == 0)
      router.push(`/artist`);
  }, [progressIdx])


  useEffect(() => {
    console.log("skjdnf")
    let findArtist = async () => {
      try {
        let response = await fetch(`/api/searchArtist?artistName=${artistName}`);
        let data = await response.json();
        setArtistId(data.message.body.artist_list[0].artist.artist_id);
      } catch (error) {
        console.error('Error finding artist ', error)
      }
    }
    if (artistName != "")
      findArtist();
  }, [artistName])

  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <GameContext.Provider value={{ artistName, setArtistName, artistId, setArtistId, progressIdx, setProgressIdx }}>
            <div className="center flex-col w-screen h-screen">
              <Stepper active={progressIdx} size="sm">
                <Stepper.Step label="Choose an Artist" description={artistName}>
                  {artist}
                </Stepper.Step>
                <Stepper.Step label="Choose a Game mode">
                  {mode}
                </Stepper.Step>
                <Stepper.Step label="Configure Game" description="">
                  {configure}
                </Stepper.Step>
              </Stepper>
            </div>
          </GameContext.Provider>
        </MantineProvider>
      </body>
    </html >
  )
}
