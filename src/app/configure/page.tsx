"use client";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../resources/contexts";
import { Button, TextInput } from "@mantine/core";



interface Album {
    albumName: string;
    albumId: number;
}

const App: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);
    const [showAlbumSelect, setShowAlbumSelect] = useState<boolean>(false);
    const { artistName, setArtistName, artistId, setArtistId } = useContext(GameContext);

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
                setSelectedAlbums(parsedAlbums);
                console.log("parsed albums ", parsedAlbums);
            } catch (error) {
                console.error('Error getting albums ', error)
            }
        }
        if (artistId != "")
            getAlbums();
    }, [artistId])

    return (
        <div className="center flex-col w-screen h-screen bg-primary">
            <h1 className="flex">
                {artistName}
            </h1>
            {
                showAlbumSelect ?
                    <div className="">
                        {
                            albums.map((album: Album, idx: number) => (
                                <div key={idx} className="flex">
                                    <input type="checkbox" />
                                    <p>{album.albumName}</p>
                                </div>
                            ))
                        }
                    </div> :
                    <div className="flex justify-between">
                        <Button>Play with All Albums</Button>
                        <Button onClick={() => setShowAlbumSelect(true)}>Select Albums</Button>
                    </div>

            }
        </div>
    )
}

export default App;
