"use client";
import React, { useState, useEffect, createContext, ReactNode } from "react";

interface GameContextType {
    artistName: string,
    setArtistName: (artistName: string) => void,
    artistId: string,
    setArtistId: (artistId: string) => void,
}
export const GameContext = createContext<GameContextType>({
    artistName: "",
    setArtistName: () => { },
    artistId: "",
    setArtistId: () => { },
})


// interface GameProviderProps {
//     children: ReactNode;
// }

// export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
// const [artistName, setArtistName] = useState<string>("");
// const [artistId, setArtistId] = useState<string>("");

//     return (
//         <GameContext.Provider value={{ artistName, setArtistName, artistId, setArtistId }}>
//             {children}
//         </GameContext.Provider>
//     );
// };
