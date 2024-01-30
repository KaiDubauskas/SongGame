"use client";
import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction, useContext } from "react";

interface GameContextType {
    artistName: string;
    setArtistName: (artistName: string) => void;
    artistId: string;
    setArtistId: (artistId: string) => void;
}

const GameContext = createContext<GameContextType>({
    artistName: "",
    setArtistName: () => { },
    artistId: "",
    setArtistId: () => { },
});

export function useGameAuth(): GameContextType {
    return useContext(GameContext);
}

export function GameContextProvider({ children }: { children: React.ReactNode }) {
    const [artistName, setArtistName] = useState<string>("");
    const [artistId, setArtistId] = useState<string>("");

    useEffect(() => {
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


    const value = {
        artistName,
        setArtistName,
        artistId,
        setArtistId,
    }


    //Eventually SongGuesserProvider will be conditionally Applied
    return (
        <>
            <GameContext.Provider value={value}>
                <SongGuesserProvider>
                    {children}
                </SongGuesserProvider>
            </GameContext.Provider>
        </>
    )
}




export interface Album {
    albumName: string;
    albumId: number;
}
interface SongGuesserContextType {
    albums: Album[],
    setAlbums: (albums: Album[]) => void,
    numQuestions: number,
}
const SongGuesserContext = createContext<SongGuesserContextType>({
    albums: [],
    setAlbums: () => { },
    numQuestions: 10,
})

export function useSongGameAuth(): SongGuesserContextType {
    return useContext(SongGuesserContext);
}

export function SongGuesserProvider({ children }: { children: React.ReactNode }) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [numQuestions, setNumQuestions] = useState<number>(5);
    const { artistId } = useGameAuth();

    useEffect(() => {
        console.log("Albums from context ", albums);
    }, [albums])

    useEffect(() => {
        let getAlbums = async () => {
            try {
                let response = await fetch(`/api/getAlbums?artistId=${artistId}`);
                let data = await response.json();
                let parsedAlbums: Album[] = data.message.body.album_list
                    .map((albumItem: any) => ({
                        albumName: albumItem.album.album_name,
                        albumId: albumItem.album.album_id
                    }))
                    .filter((album: Album, index: number, self: any[]) => {
                        return index === self.findIndex((a) => a.albumName.toLowerCase() === album.albumName.toLowerCase());
                    });
                setAlbums(parsedAlbums);
            } catch (error) {
                console.error('Error getting albums ', error)
            }
        }
        if (artistId != "")
            getAlbums();
    }, [artistId])

    return (
        <>
            <SongGuesserContext.Provider value={{ albums, setAlbums, numQuestions }}>
                {children}
            </SongGuesserContext.Provider>
        </>
    )
}





