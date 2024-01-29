"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { Album, useGameAuth, useSongGameAuth } from "../../resources/contexts";
import { Button, TextInput, Group } from "@mantine/core";
import React from "react";


const ChooseAlbums: React.FC = () => {
    const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);
    const [showAlbumSelect, setShowAlbumSelect] = useState<boolean>(true);

    const { artistName } = useGameAuth();
    const { albums, setAlbums } = useSongGameAuth();

    // Since albums will change with each checkbox select, 
    // A persistent copy of the initial value of albums is stored
    const albumRef = useRef(albums);

    useEffect(() => {
        setAlbums(selectedAlbums)
    }, [selectedAlbums]);

    const handleAlbumSelectionChange = (selectedAlbum: Album, isChecked: boolean) => {
        if (isChecked) {
            setSelectedAlbums((prevSelectedAlbums) => {
                if (!prevSelectedAlbums.some((album) => album.albumId === selectedAlbum.albumId)) {
                    return [...prevSelectedAlbums, selectedAlbum];
                }
                return prevSelectedAlbums;
            });
        } else {
            setSelectedAlbums((prevSelectedAlbums) =>
                prevSelectedAlbums.filter((album) => album.albumId !== selectedAlbum.albumId)
            );
        }
    };


    return (
        <div className="center flex-col py-4 overflow-y-scroll">
            <h1 className="flex">
                {artistName}
            </h1>
            {
                showAlbumSelect ?
                    <div className="">
                        {
                            albumRef.current.map((album: Album, idx: number) => (
                                <div key={idx} className="flex">
                                    <input type="checkbox" onChange={(e) => handleAlbumSelectionChange(album, e.target.checked)} />
                                    <p>{album.albumName}</p>
                                </div>
                            ))
                        }

                    </div> :
                    <div className="flex justify-between">
                        <Button className="accent-button">Play with All Albums</Button>
                        <Button onClick={() => setShowAlbumSelect(true)}>Select Albums</Button>
                    </div>
            }
        </div>
    )
}

export default ChooseAlbums;
