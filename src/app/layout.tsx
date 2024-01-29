"use client";
import { MantineProvider, AppShell } from "@mantine/core";
import { GameContextProvider } from "../resources/contexts";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import './globals.css';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import TuneTrivia from "../assets/TuneTrivia.png"
import React from "react";

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
            <body className="h-screen w-screen bg-murk-background">
                <MantineProvider>
                    <AppShell
                        header={{ height: 70 }}
                        padding="md"
                        withBorder={false}
                    >
                        <AppShell.Header className="flex items-center justify-center">
                            <Image src={TuneTrivia} alt="TuneTrivia" style={{ objectFit: "contain", height: "3em" }} />
                        </AppShell.Header>
                        <AppShell.Main>
                            <GameContextProvider>
                                {isPlaying ? play : configure}
                            </GameContextProvider>
                        </AppShell.Main>
                    </AppShell>
                </MantineProvider>
            </body>
        </html>

    )
} 
