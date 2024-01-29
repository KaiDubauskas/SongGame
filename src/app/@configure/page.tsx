"use client";
import { useState, useEffect, useContext } from "react";
import { Button, Group, MantineProvider, Stepper } from "@mantine/core";
import { useGameAuth, useSongGameAuth } from "../../resources/contexts";
import { Transition } from '@mantine/core';
import ChooseArtist from "./ChooseArtist";
import ChooseAlbums from "./ChooseAlbums";
import ChooseMode from "./ChooseMode"
import "@mantine/core/styles.css";
import "./configure.css";
import "../globals.css";
import { useRouter } from "next/navigation";
import React from "react";


const App: React.FC = () => {
    const router = useRouter();
    const [progressIdx, setProgressIdx] = useState<number>(0);
    const { artistName } = useGameAuth();

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
        <div className="stepper-container w-full h-full pb-5 px-10 text-murk-text">
            <Stepper active={progressIdx} size="md">
                <Stepper.Step label="Artist" description={artistName}>
                    <ChooseArtist />
                </Stepper.Step>
                <Stepper.Step label="Game Mode">
                    <ChooseMode />
                </Stepper.Step>
                <Stepper.Step label="Configure" description="">
                    <ChooseAlbums />
                </Stepper.Step>
            </Stepper>
            <Group className="stepper-nav" justify="center" mt="xl">
                {progressIdx > 0 && <button className="accent-button" onClick={prevStep}>Back</button>}
                <button className="accent-button" onClick={nextStep}>{progressIdx < 2 ? <>Next</> : <>Submit</>}</button>
            </Group>

        </div>
    );
}

export default App;
