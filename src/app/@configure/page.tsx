"use client";
import { useState, useEffect, useContext } from "react";
import { Button, Group, MantineProvider, Stepper } from "@mantine/core";
import { useGameAuth, useSongGameAuth } from "@/resources/contexts";
import ChooseArtist from "./ChooseArtist";
import ChooseAlbums from "./ChooseAlbums";
import "@mantine/core/styles.css";
import { useRouter } from "next/navigation";

const App: React.FC = () => {
    const router = useRouter();

    const [progressIdx, setProgressIdx] = useState<number>(0);
    const { artistName } = useGameAuth();
    const { albums } = useSongGameAuth();



    const nextStep = () => {
        if (progressIdx === 2) {
            router.push('/play');
        }
        setProgressIdx((prev: number) => (prev < 2) ? prev + 1 : prev);
    }

    const prevStep = () => {
        setProgressIdx((prev: number) => (prev > 0) ? prev - 1 : prev);
    }

    return (

        <div className="center flex-col w-screen h-screen">
            <Stepper active={progressIdx} size="sm">
                <Stepper.Step label="Choose an Artist" description={artistName}>
                    <ChooseArtist />
                </Stepper.Step>
                <Stepper.Step label="Choose a Game mode">
                    <h1>{artistName}</h1>
                </Stepper.Step>
                <Stepper.Step label="Configure Game" description="">
                    <ChooseAlbums />
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                {progressIdx > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
                <Button variant="default" onClick={nextStep}>{progressIdx < 2 ? <>Next</> : <>Submit</>}</Button>
            </Group>
        </div>
    );
}

export default App;
