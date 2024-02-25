"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { useGameAuth } from "../../resources/contexts";
import { Button, TextInput, Group, Title, } from "@mantine/core";
import { useDidUpdate } from '@mantine/hooks';
import { usePrevious } from '@mantine/hooks';
import React from "react";
import { useSongGameAuth } from "../../resources/contexts";


const ChooseMode: React.FC = () => {
    const { difficulty, setDifficulty } = useSongGameAuth();

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

    return (
        <div className="center flex-col">
            <h1 className="text-xl mb-3">Choose a Difficulty</h1>
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
            <h3 className="mt-3">{displayMessage()}</h3>

        </div>
    )
}

export default ChooseMode;
