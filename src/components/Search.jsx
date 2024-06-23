import React, { useState } from "react";
import axios from 'axios';
import { LuSearch } from "react-icons/lu";
import Modal from "./Modal";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";


const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addTrackToPlaylist } = React.useContext(MusicPlayerContext);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (query.trim() === '') return;

        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults: 5,
                    key: 'YOUR_API_KEY', // 여기에 유튜브 API 키를 입력하세요
                },
            });
            setResults(response.data.items);
            setIsModalOpen(true);
        } catch (error) {
            console.error('YouTube 검색에 실패했습니다.', error);
        }
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
                    <LuSearch onClick={handleSearch} />
                </label>
                <input
                    type="text"
                    placeholder="Search"
                    id="searchInput"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                results={results}
                onAddToPlaylist={handleAddToPlaylist}
            />
        </article>
    );
};

export default Search;
