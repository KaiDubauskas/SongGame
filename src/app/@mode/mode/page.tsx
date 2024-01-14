"use client";

import { useContext } from "react";
import { GameContext } from "@/resources/contexts";

import { Button, TextInput, Group } from "@mantine/core";

const App: React.FC = () => {
    const { setProgressIdx } = useContext(GameContext);

    return (
        <div className="center flex-col">
            TODO ADD GAME MODES

            <Group justify="center" mt="xl">
                <Button onClick={() => setProgressIdx(prev => prev - 1)}>Back</Button>
                <Button variant="default" onClick={() => setProgressIdx(prev => prev + 1)}>Next</Button>
            </Group>
        </div>
    )
}

export default App;
