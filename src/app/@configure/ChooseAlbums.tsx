"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Album, useGameAuth, useSongGameAuth } from "../../resources/contexts";


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
    }, [selectedAlbums, setAlbums]);

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

    const selectAll = () => {
        setSelectedAlbums(albumRef.current);
    }


    return (
        <div className="center flex-col py-4 h-full">
            <h1 className="flex">
                {artistName}
            </h1>
            {
                showAlbumSelect ?
                    <>
                        <div className="h-full overflow-y-scroll">
                            {
                                albumRef.current.map((album: Album, idx: number) => (
                                    <div key={idx} className="flex">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleAlbumSelectionChange(album, e.target.checked)}
                                            checked={selectedAlbums.some(selectedAlbum => selectedAlbum.albumId === album.albumId)}
                                        />
                                        <p>{album.albumName}</p>
                                    </div>
                                ))
                            }

                        </div>
                        <button className="accent-button" onClick={selectAll}>Select All Albums</button>
                    </>
                    :
                    <div className="flex justify-between">
                        {/* <Button className="accent-button">Play with All Albums</Button>
                        <Button onClick={() => setShowAlbumSelect(true)}>Select Albums</Button> */}
                    </div>
            }
        </div>
    )
}

export default ChooseAlbums;
