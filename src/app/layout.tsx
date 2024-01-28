"use client";
import { MantineProvider } from "@mantine/core";
import { GameContextProvider } from "src/resources/contexts";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import './globals.css';
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForceUpdate } from "@mantine/hooks";

export default function RootLayout({ configure, play }: {
    configure: React.ReactNode,
    play: React.ReactNode,
}) {
    const pathname = usePathname() || "";
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (pathname == "/play") {
            setIsPlaying(true);
        }
    }, [pathname])

    return (
        <html lang="en">
            <body>
                <MantineProvider>
                    <GameContextProvider>
                        {isPlaying ? play : configure}
                    </GameContextProvider>
                </MantineProvider>
            </body>
        </html>

    )
} 
