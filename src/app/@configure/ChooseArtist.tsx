"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useGameAuth } from "../../resources/contexts";


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

        // For build purposes. Ignores react-hooks/exhaustive-deps rule
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setArtistName]);


    return (
        <div className="center flex-col">
            <h1 className="text-xl m-0">Enter an Artist&apos;s Name</h1>
            <input type="text" placeholder="eg. Lana Del Rey" className="accent-input brighten my-2 mx-0" value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)} />
        </div>
    )
}

export default ChooseArtist;
