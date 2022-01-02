import {useState} from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

const Search = () => {
    const [trackTitle, setTrackTitle] = useState('')

    const onChange = (e) => {
        setTrackTitle(e.target.value)
    }

    const findTrack = (dispatch, e) => {
        e.preventDefault()
        axios.get(`https://api.codetabs.com/v1/proxy?quest=https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                })
                setTrackTitle('')
            })
            .catch(err => console.log(err))
    }

    return (
        <Consumer>
            {value => {
                const {dispatch} = value
                return (
                    <div className='card card-body mb-4 p-4'>
                        <h1 className='display-4 text-center'>
                            <i className='fas fa-music'></i> Search For A Song
                        </h1>
                        <p className='lead text-center'>
                            Get the lyrics for any song
                        </p>
                        <form onSubmit={findTrack.bind(this, dispatch)}>
                            <div className='form-group'>
                                <input type='text' className='form-control form-control-lg' 
                                    placeholder='Song title...' name='trackTitle'
                                    value={trackTitle} onChange={onChange} />
                            </div>
                            <div className="d-grid gap-2">
                                <button className='btn btn-primary btn-lg mt-4 mb-4' type='submit'>
                                    Get Track Lyrics
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }}
        </Consumer>
    )
}

export default Search
