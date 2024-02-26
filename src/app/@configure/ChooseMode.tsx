"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { useGameAuth } from "../../resources/contexts";
import { Button, TextInput, Group, Title, Stack, NumberInput, Container, Divider } from "@mantine/core";
import { useDidUpdate } from '@mantine/hooks';
import { usePrevious } from '@mantine/hooks';
import React from "react";
import { useSongGameAuth } from "../../resources/contexts";


const ChooseMode: React.FC = () => {
    const { difficulty, setDifficulty, setNumQuestions } = useSongGameAuth();

    const displayMessage = () => {
        switch (difficulty[0]) {
            case ("easy"):
                return "15 lines given"
            case ("medium"):
                return "10 lines given"
            case ("hard"):
                return "5 lines given"
            case ("expert"):
                return "3 lines given"
        }
    }

    function handleNumChange(val: string | number) {
        if (typeof val === "string") {
            setNumQuestions(parseInt(val));
        } else {
            setNumQuestions(val);
        }
    }

    return (
        <div className="center flex-col">
            <Stack align="center" gap="sm">
                <h1 className="text-xl mb-2">Difficulty</h1>
                <Group>
                    <Button
                        onClick={() => setDifficulty(["easy", 15])}
                        color={difficulty[0] === "easy" ? "teal" : "gray"}
                        variant="outline"
                    >
                        Easy
                    </Button>
                    <Button
                        onClick={() => setDifficulty(["medium", 10])}
                        color={difficulty[0] === "medium" ? "teal" : "gray"}
                        variant="outline"
                    >
                        Medium
                    </Button>
                    <Button
                        onClick={() => setDifficulty(["hard", 5])}
                        color={difficulty[0] === "hard" ? "teal" : "gray"}
                        variant="outline"
                    >
                        Hard
                    </Button>
                    <Button
                        onClick={() => setDifficulty(["expert", 3])}
                        color={difficulty[0] === "expert" ? "teal" : "gray"}
                        variant="outline"
                    >
                        Expert
                    </Button>
                </Group>
                <h3>{displayMessage()}</h3>
            </Stack>
            <Divider size="sm" style={{ borderTop: "2px solid var(--color-murk-highlight)" }} className="rounded w-full mt-8 mb-10" />
            <Container>
                <div className="flex items-center">
                    <h1 className="text-xl mr-3">Number of Questions:</h1>
                    <NumberInput onChange={handleNumChange} className="w-11 !m-0" hideControls max={30} min={1} defaultValue={10}></NumberInput>
                </div>
            </Container>

        </div >
    )
}

export default ChooseMode;
