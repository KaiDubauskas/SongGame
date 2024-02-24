"use client";
import React from "react";
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react";
import { useSongGameAuth, useGameAuth } from "../../../resources/contexts";
import { Notifications, notifications, cleanNotifications } from "@mantine/notifications";
import "../../globals.css"
import "./play.css"


type Question = {
    lyric: string
    answer: string,
}

type Track = {
    track_name: string
    track_id: number,
}

type HardcodedTrack = {
    trackName: string;
    lyrics: string;
}

const App: React.FC = () => {
    const router = useRouter();
    const { albums, numQuestions } = useSongGameAuth();
    const { isArtistHardcoded } = useGameAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [answer, setAnswer] = useState<string>("");
    const [numCorrect, setNumCorrect] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [questionNumber]);

    const formatAnswer = (text: string) => {
        return text.replace(/\([^()]*\)/g, '').trim();
    }
    const formatLyrics = (text: string) => {
        return text.replace(/\s*\*+.*\*+\s*\(\d+\)$/, '');
    }


    const getTrackLyrics = async (albumId: number) => {
        try {
            let response = await fetch(`/api/getAlbumTracks?albumId=${albumId}`);
            let data = (await response.json()).message.body.track_list;
            let randomTrack: Track = data[Math.floor(Math.random() * data.length)].track;
            let trackName = randomTrack.track_name;
            let trackId = randomTrack.track_id;

            let trackLyricsResponse = (await fetch(`/api/getTrackLyrics?trackId=${trackId}`));
            let trackLyricsData = (await trackLyricsResponse.json()).message.body.lyrics.lyrics_body;

            return { answer: formatAnswer(trackName), lyric: formatLyrics(trackLyricsData) } as Question
        } catch (error) {
            console.error('Error getting albums ', error);
        }
    };
    const loadQuestions = async () => {
        const newQuestions: Question[] = [];
        for (let i = 0; i < numQuestions; i++) {
            let album = albums[Math.floor(Math.random() * albums.length)];
            let question = album && await getTrackLyrics(album.albumId);
            if (question) {
                newQuestions.push(question);
            }
        }
        setQuestions(newQuestions);
    }

    const loadHardcodedQuestions = () => {
        let visited: number[] = []
        const tracks: HardcodedTrack[] = albums.reduce((acc, album) => acc.concat(album.tracks), [] as HardcodedTrack[]);
        for (let i = 0; i < numQuestions; i++) {
            let trackIdx = Math.floor(Math.random() * tracks.length);
            while (visited.includes(trackIdx))
                trackIdx = Math.floor(Math.random() * tracks.length);
            const track = tracks[trackIdx]
            setQuestions((prevQuestions) => [...prevQuestions, { answer: track.trackName, lyric: track.lyrics } as Question])
            visited.push(trackIdx)
        }
    }

    useEffect(() => {
        cleanNotifications();
        if (isArtistHardcoded) {
            loadHardcodedQuestions()
            setIsLoading(false);
        } else {
            loadQuestions().then(() => setIsLoading(false));
        }
    }, [albums, numQuestions]);

    useEffect(() => {
        if (questionNumber >= numQuestions) {
            router.push(`/play/result?numCorrect=${numCorrect}&numQuestions=${numQuestions}`);
        }
    }, [questionNumber, router, numQuestions, numCorrect])

    const showCorrectNotification = () => {
        notifications.show({
            message: 'Correct!',
            autoClose: 2000,
            color: 'green',
        });
    }

    const showInCorrectNotification = (correctAnswer: string) => {
        notifications.show({
            title: 'Incorrect!',
            message: 'The correct answer was ' + correctAnswer,
            autoClose: 2000,
            color: 'red',
        });
    }


    const handleSubmit = () => {
        if (answer.toLowerCase() === questions[questionNumber].answer.toLowerCase()) {
            setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
            showCorrectNotification();
        } else {
            showInCorrectNotification(questions[questionNumber].answer);
        }
        setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
        setAnswer("");
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="center w-full h-full text-murk-text">
            <Notifications position="top-right" zIndex={1000} />
            <div className="center play-inner-container h-full max-h-full">
                {isLoading ? <h1>Fetching Questions...</h1> :
                    <div className="flex flex-col">
                        <h1 className="ml-1 mb-1">Question: {questionNumber + 1}/{numQuestions}</h1>
                        <div className="flex lyric-container h-full max-h-96 shrink-1 overflow-y-scroll">
                            {questions[questionNumber]?.lyric}
                        </div>
                        <div className="play-actions-container">
                            <input
                                ref={inputRef}
                                placeholder="Enter Song Title... "
                                type="text"
                                className="accent-input brighten"
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setAnswer(e.currentTarget.value)}
                                value={answer}
                            />
                            <button className="accent-button text-sm h-full mx-4" onClick={handleSubmit}>Next</button>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default App;

