"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { useGameAuth } from "../../resources/contexts";
import { Button, TextInput, Group } from "@mantine/core";
import { useDidUpdate } from '@mantine/hooks';
import { usePrevious } from '@mantine/hooks';
import React from "react";


const ChooseMode: React.FC = () => {
    return (
        <div className="center flex-col">
            <h1>TODO: add more game modes. For now just click the next button</h1>
        </div>
    )
}

export default ChooseMode;
