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
            <h1>Choose Game Mode</h1>
            <TextInput className="w-40 my-2" />
        </div>
    )
}

export default ChooseMode;
