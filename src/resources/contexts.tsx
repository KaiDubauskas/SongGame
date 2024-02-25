"use client";
import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { hardcodedArtists, hardcodedArtistContent } from "./hardcoded";
interface GameContextType {
    artistName: string;
    setArtistName: (artistName: string) => void;
    artistId: string;
    setArtistId: (artistId: string) => void;
    isArtistHardcoded: boolean;
}

const GameContext = createContext<GameContextType>({
    artistName: "",
    setArtistName: () => { },
    artistId: "",
    setArtistId: () => { },
    isArtistHardcoded: false,
});

export function useGameAuth(): GameContextType {
    return useContext(GameContext);
}

export function GameContextProvider({ children }: { children: React.ReactNode }) {
    const [artistName, setArtistName] = useState<string>("");
    const [artistId, setArtistId] = useState<string>("");
    const [isArtistHardcoded, setIsArtistHardcoded] = useState<boolean>(false);

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
        if (artistName != "") {
            if (hardcodedArtists.includes(artistName.toLowerCase())) {
                setIsArtistHardcoded(true);
                console.log("LOLOLO")
            } else {
                findArtist();
            }
        }
    }, [artistName])


    const value = {
        artistName,
        setArtistName,
        artistId,
        setArtistId,
        isArtistHardcoded
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
    tracks: Track[] | [];
}

interface Track {
    trackName: string;
    lyrics: string;
}
type Difficulty = ["easy", 15] | ["medium", 10] | ["hard", 5] | ["expert", 3]
interface SongGuesserContextType {
    albums: Album[],
    setAlbums: (albums: Album[]) => void,
    numQuestions: number,
    difficulty: Difficulty,
    setDifficulty: (difficuly: Difficulty) => void,
}

const SongGuesserContext = createContext<SongGuesserContextType>({
    albums: [],
    setAlbums: () => { },
    numQuestions: 5,
    difficulty: ["easy", 15],
    setDifficulty: (difficulty: Difficulty) => { },
})

export function useSongGameAuth(): SongGuesserContextType {
    return useContext(SongGuesserContext);
}

export function SongGuesserProvider({ children }: { children: React.ReactNode }) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [numQuestions, setNumQuestions] = useState<number>(5);
    const [difficulty, setDifficulty] = useState<Difficulty>(["easy", 15]);
    const { artistId, isArtistHardcoded, artistName } = useGameAuth();


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

    useEffect(() => {
        if (isArtistHardcoded && hardcodedArtists.includes(artistName.toLowerCase())) {
            const artist = hardcodedArtistContent.find(artist => artist.name.toLowerCase() === artistName.toLowerCase());
            if (artist)
                setAlbums(artist.albums)
        }
    }, [isArtistHardcoded])

    useEffect(() => {
        console.log("ALSNDLKNS", albums);
    }, [albums])

    return (
        <>
            <SongGuesserContext.Provider value={{ albums, setAlbums, numQuestions, difficulty, setDifficulty }}>
                {children}
            </SongGuesserContext.Provider>
        </>
    )
}





