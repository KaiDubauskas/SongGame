"use client";
import { useState } from 'react';
import { GameContext, SongGuesserContext } from "../resources/contexts";
import { Notifications } from '@mantine/notifications';

interface Album {
    albumName: string;
    albumId: number;
}

export default function Layout({ children, }: {
    children: React.ReactNode
}) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [numQuestions, setNumQuestions] = useState<number>(3);


    return (
        <SongGuesserContext.Provider value={{ albums, setAlbums, numQuestions }}>
            <Notifications />
            {children}
        </SongGuesserContext.Provider>
    )
}
