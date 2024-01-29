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
import { IconCircleArrowRight } from "@tabler/icons-react";
import { IconCircleArrowLeft } from "@tabler/icons-react"
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
                    <div className="center h-full">
                        <ChooseArtist />
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Game Mode">
                    <div className="center h-full">
                        <ChooseMode />
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Configure">
                    <div className="center h-full">
                        <ChooseAlbums />
                    </div>
                </Stepper.Step>
            </Stepper>
            <div className="center stepper-nav-container">
                <div className="stepper-nav">
                    <div className="back-button">
                        {progressIdx > 0 && <IconCircleArrowLeft stroke={1.5} color='var(--color-murk-accent)' size={"100%"} onClick={prevStep} />}
                    </div>
                    <div className="next-button">
                        <IconCircleArrowRight stroke={1.5} color='var(--color-murk-accent)' size={"100%"} onClick={nextStep} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
