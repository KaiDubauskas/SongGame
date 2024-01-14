"use client";
import { useState } from "react";
import { SongGuesserContext } from "@/resources/contexts";

interface Album {
    albumName: string;
    albumId: number;
}


export default function RootLayout({ children }: {
    children: React.ReactNode,
}) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [numQuestions, setNumQuestions] = useState<number>(3);

    return (
        <>
            <SongGuesserContext.Provider value={{ albums, setAlbums, numQuestions }}>
                {children}
            </SongGuesserContext.Provider>
        </>
    )
}
