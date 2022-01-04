import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'

const Lyrics = () => {
    const [track, setTrack] = useState({})
    const [lyrics, setLyrics] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios.get(`https://api.codetabs.com/v1/proxy?quest=https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                let lyrics = res.data.message.body.lyrics;
                setLyrics(lyrics);
                console.log(lyrics)
                return axios.get(`https://api.codetabs.com/v1/proxy?quest=https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                let track = res.data.message.body.track;
                setTrack(track);
                console.log(track)
            })
            .catch(err => console.log(err))
    }, [id])
    if(track === undefined || Object.keys(track).length === 0) {
        return <Spinner />
    } else {
        return (
            <>
                <Link to="/react-lyric-finder" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                <div className="card mb-4">
                    <h5 className="card-header">
                        {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                    </h5>
                    <div className="card-body">
                        <ul className="list-group mb-3">
                            <li className="list-group-item">
                                <strong>Album ID</strong>: {track.album_id}
                            </li>
                            <li className="list-group-item">
                                <strong>Genre</strong>: {track.primary_genres.music_genre_list.length !== 0 ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : 'N/A'}
                            </li>
                            <li className="list-group-item">
                                <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                            </li>
                            <li className="list-group-item">
                                <strong>Rating</strong>: {track.track_rating}
                            </li>
                        </ul>
                        <p className="card-text">
                            {track.has_lyrics === 0 ? 'No lyrics to show' : lyrics.lyrics_body.split("\n").map(lyric => {
                                return <>{lyric}<br /></>
                            })}
                        </p>
                    </div>
                </div>
                
            </>
        )
    }
}

export default Lyrics