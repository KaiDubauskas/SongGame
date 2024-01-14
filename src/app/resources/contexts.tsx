"use client";
import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface GameContextType {
    artistName: string,
    setArtistName: (artistName: string) => void,
    artistId: string,
    setArtistId: (artistId: string) => void,
    progressIdx: number,
    setProgressIdx: Dispatch<SetStateAction<number>>
}
export const GameContext = createContext<GameContextType>({
    artistName: "",
    setArtistName: () => { },
    artistId: "",
    setArtistId: () => { },
    progressIdx: 0,
    setProgressIdx: () => { },
})

interface Album {
    albumName: string;
    albumId: number;
}
interface SongGuesserContextType {
    albums: Album[],
    setAlbums: (albums: Album[]) => void,
    numQuestions: number,
}

export const SongGuesserContext = createContext<SongGuesserContextType>({
    albums: [],
    setAlbums: () => { },
    numQuestions: 10,
})


