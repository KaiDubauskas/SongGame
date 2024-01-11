
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
    message?: string;
}

const MUSIXMATCH_API_KEY = process.env.NEXT_PUBLIC_MUSIXMATCH_API_KEY

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    try {
        const artistId = req.query.artistId as string;
        const response = await fetch(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&page_size=25&apikey=${MUSIXMATCH_API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artist data' });
    }
}
