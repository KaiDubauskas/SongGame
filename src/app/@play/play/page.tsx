"use client";
import router, { useRouter } from "next/navigation"
import { useState, useEffect, useContext, useRef } from "react";
import { Album, useGameAuth, useSongGameAuth } from "src/resources/contexts";
import { Button, TextInput, Group } from "@mantine/core";
import { useDidUpdate } from '@mantine/hooks';
import { usePrevious } from '@mantine/hooks';
import { Notifications, notifications } from "@mantine/notifications";


type Question = {
    lyric: string
    answer: string,
}

type Track = {
    track_name: string
    track_id: number,
}

const App: React.FC = () => {
    const router = useRouter();
    const { albums, numQuestions } = useSongGameAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [answer, setAnswer] = useState<string>("");
    const [numCorrect, setNumCorrect] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatAnswer = (text: string) => {
        return text.replace(/\([^()]*\)/g, '').trim();
    }
    const formatLyrics = (text: string) => {
        return text.replace(/\s*\*+.*\*+\s*\(\d+\)$/, '');
    }

    useEffect(() => {
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
        loadQuestions().then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (questionNumber >= numQuestions) {
            router.push(`/play/result?numCorrect=${numCorrect}&numQuestions=${numQuestions}`);
        }
    }, [questionNumber])

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

    return (

        <div>
            <Notifications position="top-center" zIndex={1000} />
            {isLoading ? <h1>Fetching Questions...</h1> :
                <div>
                    <h1>Question: {questionNumber + 1}/{numQuestions}</h1>
                    {questions[questionNumber]?.lyric}
                    <TextInput value={answer} onChange={(e) => setAnswer(e.currentTarget.value)} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            }
        </div>

    )
}

export default App;


// {
//     albums?.map((album: Album, idx: number) => (
//         <div key={idx} className="flex">
//             <input type="checkbox" />
//             <p>{album.albumName}</p>
//         </div>
//     ))
// }

