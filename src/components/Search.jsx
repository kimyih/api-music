import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { LuSearch } from "react-icons/lu";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";
import Modal from "./Modal";

const Search = ({ editingPlaylist }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const { addTrackToPlaylist } = useContext(MusicPlayerContext);
    const [playlistDetails, setPlaylistDetails] = useState(null);

    useEffect(() => {
        if (editingPlaylist) {
            const playlist = JSON.parse(localStorage.getItem(editingPlaylist));
            setPlaylistDetails(playlist);
        } else {
            setPlaylistDetails(null);
        }
    }, [editingPlaylist]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: value,
                    type: 'video',
                    maxResults: 5,
                    key: 'AIzaSyCLA2Pqwzm-N_nU4LmqS9Dfo5nR5cdC7og', // 여기에 유튜브 API 키를 입력하세요
                },
            });
            setResults(response.data.items);
        } catch (error) {
            console.error('YouTube 검색에 실패했습니다.', error);
        }
    };

    const handleResultClick = (videoId) => {
        setSelectedVideo(videoId);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    const handleAddToPlaylist = (playlistId, track) => {
        const playlist = JSON.parse(localStorage.getItem(playlistId));
        if (playlist) {
            playlist.items.push(track);
            localStorage.setItem(playlistId, JSON.stringify(playlist));
            alert('플레이리스트에 추가되었습니다.');
        }
    };

    return (
        <article className="search">
            <div className="search-input-container">
                <label htmlFor="searchInput">
                    <LuSearch />
                </label>
                <input
                    type="text"
                    placeholder="Search"
                    id="searchInput"
                    value={query}
                    onChange={handleInputChange}
                />
            </div>
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((result) => (
                        <li key={result.id.videoId} onClick={() => handleResultClick(result.id.videoId)}>
                            <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
                            <div>
                                <h3>{result.snippet.title}</h3>
                                <p>{result.snippet.channelTitle}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Modal
                isOpen={!!selectedVideo}
                onClose={handleCloseModal}
                results={results}
                onAddToPlaylist={handleAddToPlaylist}
                selectedVideo={selectedVideo}
            />
            {editingPlaylist && playlistDetails && (
                <div className="playlist-details">
                    <h2>{playlistDetails.name}</h2>
                    <ul>
                        {playlistDetails.items.map((item, index) => (
                            <li key={index}>
                                <span>{item.title}</span>
                                <span>{item.artist}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
};

export default Search;
