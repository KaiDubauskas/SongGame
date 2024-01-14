"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import { SongGuesserContext } from "@/resources/contexts";
import { TextInput, Button } from "@mantine/core";
import { notifications } from '@mantine/notifications';


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
    const { albums, numQuestions } = useContext(SongGuesserContext);
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
            router.push(`/configure/result?numCorrect=${numCorrect}&numQuestions=${numQuestions}`);
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
        if (questionNumber < questions.length) {
            if (answer.toLowerCase() === questions[questionNumber].answer.toLowerCase()) {
                setNumCorrect((prevNumCorrect) => prevNumCorrect + 1);
                showCorrectNotification();
            } else {
                showInCorrectNotification(questions[questionNumber].answer);
            }
            setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
            setAnswer("");
        } else {

            // router.push(`/configure/result?numCorrect=${numCorrect}&numQuestions=${numQuestions}`);
        }
    }

    return (
        <div>
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
