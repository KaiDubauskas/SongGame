"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { useGameAuth } from "../../resources/contexts";
import { Button, TextInput, Group } from "@mantine/core";
import { useDidUpdate } from '@mantine/hooks';
import { usePrevious } from '@mantine/hooks';
import React from "react";


const ChooseArtist: React.FC = () => {
    const [nameInput, setNameInput] = useState<string>("");
    const nameRef = useRef(nameInput);
    const { artistName, setArtistName } = useGameAuth();


    useEffect(() => {
        nameRef.current = nameInput;
    }, [nameInput]);

    useEffect(() => {
        setNameInput(artistName);
        return () => setArtistName(nameRef.current);
    }, []);


    return (
        <div className="center flex-col">
            <h1 className="text-xl m-0">Enter an Artist's Name</h1>
            <input type="text" placeholder="eg. Lana Del Rey" className="accent-input brighten my-2 mx-0" value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)} />
        </div>
    )
}

export default ChooseArtist;
