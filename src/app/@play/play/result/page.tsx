"use client";
import React from "react";
import { useRouter, useSearchParams } from 'next/navigation';

const App: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const numCorrect = searchParams?.get('numCorrect');
    const numQuestions = searchParams?.get('numQuestions');

    const handlePlayAgain = () => {
        router.push('/play');
    }

    return (
        <div className="center flex-col w-full h-full text-murk-text">
            <h1 className="text-xl mb-2">Score:</h1>
            <h3 className="mb-3">You got {numCorrect} out of {numQuestions} questions correct!</h3>
            <button className="accent-button" onClick={handlePlayAgain}>Play Again</button>
        </div>
    )
}

export default App;
