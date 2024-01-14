"use client";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "@/resources/contexts";
import { useRouter } from 'next/navigation';
import { Button, TextInput, Group } from "@mantine/core";

const App: React.FC = () => {
    const [nameInput, setNameInput] = useState<string>("");
    const { artistName, setArtistName, artistId, setArtistId, setProgressIdx } = useContext(GameContext);

    const handleSubmit = () => {
        setArtistName(nameInput);
        setProgressIdx(prev => prev + 1);
    }

    useEffect(() => {
        setNameInput(artistName);
    }, [])

    return (
        <div className="center flex-col">
            <h1>Enter the Artist Name</h1>

            <TextInput className="w-40 my-2" value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)} />
            <Group justify="center" mt="xl">
                <Button onClick={() => setProgressIdx(prev => prev - 1)}>Back</Button>
                <Button variant="default" onClick={handleSubmit}>Next</Button>
            </Group>
        </div>
    )
}

export default App;
