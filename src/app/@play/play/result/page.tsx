"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@mantine/core";
import React from "react";

const App: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const numCorrect = searchParams?.get('numCorrect');
    const numQuestions = searchParams?.get('numQuestions');

    const handlePlayAgain = () => {
        router.push('/');
    }

    return (
        <div>
            <h1>Result</h1>
            <p>You got {numCorrect} out of {numQuestions} questions correct!</p>
            <Button onClick={handlePlayAgain}>Play Again</Button>
        </div>
    )
}

export default App;
