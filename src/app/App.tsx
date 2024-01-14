"use client";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "./resources/contexts";
import { useRouter } from 'next/navigation';
import { Button, TextInput } from "@mantine/core";

const App: React.FC = () => {
    const router = useRouter();
    const [nameInput, setNameInput] = useState<string>("");

    const { artistName, setArtistName, artistId, setArtistId } = useContext(GameContext);

    const handleSubmit = () => {
        setArtistName(nameInput);
        router.push(`/configure?artistName=${nameInput}`);
    }

    useEffect(() => {
        console.log("skjdnf")
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

    useEffect(() => {
        console.log(artistId);
    }, [artistId])

    return (
        <div className="center flex-col">
            <h1>Enter the Artist Name</h1>
            <TextInput className="w-40 my-2" value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)} />
            <Button onClick={handleSubmit}>Next</Button>
        </div>
    )
}

export default App;
