"use client";
import { useState, useEffect, useContext } from "react";
import { GameContext, SongGuesserContext } from "@/resources/contexts";
import { Button, Group } from "@mantine/core";
import { useRouter, useSearchParams } from 'next/navigation';


interface Album {
    albumName: string;
    albumId: number;
}

const App: React.FC = () => {
    const router = useRouter();
    const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);
    const [showAlbumSelect, setShowAlbumSelect] = useState<boolean>(false);
    const { artistName, setArtistName, artistId, setArtistId, setProgressIdx } = useContext(GameContext);
    const { albums, setAlbums, numQuestions } = useContext(SongGuesserContext);

    useEffect(() => {
        console.log("slkdfsklnfdksndfksldnf", numQuestions)
    }, [])

    useEffect(() => {
        console.log("artistId ", artistId);
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
    }, [artistId]);

    const handleAlbumSelectionChange = (selectedAlbum: Album, isChecked: boolean) => {
        console.log("selected album ", selectedAlbum);
        console.log(isChecked);
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


    const handleSubmit = () => {
        console.log(selectedAlbums);
        setAlbums(selectedAlbums);
        router.push(`/configure/play`);
    }

    return (
        <div className="center flex-col py-4 overflow-y-scroll">
            <h1 className="flex">
                {artistName}
            </h1>
            {
                showAlbumSelect ?
                    <div className="">
                        {
                            albums.map((album: Album, idx: number) => (
                                <div key={idx} className="flex">
                                    <input type="checkbox" onChange={(e) => handleAlbumSelectionChange(album, e.target.checked)} />
                                    <p>{album.albumName}</p>
                                </div>
                            ))
                        }
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div> :
                    <div className="flex justify-between">
                        <Button>Play with All Albums</Button>
                        <Button onClick={() => setShowAlbumSelect(true)}>Select Albums</Button>
                    </div>
            }
            <Group justify="center" mt="xl">
                <Button onClick={() => setProgressIdx(prev => prev - 1)}>Back</Button>
                <Button variant="default" onClick={() => setProgressIdx(prev => prev + 1)}>Next</Button>
            </Group>
        </div>
    )
}

export default App;
