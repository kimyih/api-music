import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ReactPlayer from 'react-player';

const Modal = ({ isOpen, onClose, results, onAddToPlaylist, selectedVideo }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const count = Number(localStorage.getItem('playlistCount')) || 0;
            const loadedPlaylists = [];
            for (let i = 1; i <= count; i++) {
                const playlistKey = `playlist${i}`;
                const playlist = JSON.parse(localStorage.getItem(playlistKey));
                if (playlist) {
                    loadedPlaylists.push(playlist);
                }
            }
            setPlaylists(loadedPlaylists);
        }
    }, [isOpen]);

    const handleAddClick = (playlistId, track) => {
        onAddToPlaylist(playlistId, track);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={onClose}>
                    <MdClose size={24} />
                </button>
                {selectedVideo ? (
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${selectedVideo}`} controls />
                ) : (
                    <>
                        <h2>플레이리스트 선택</h2>
                        <ul>
                            {results.map((result) => (
                                <li key={result.id.videoId}>
                                    <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
                                    <div>
                                        <h3>{result.snippet.title}</h3>
                                        <p>{result.snippet.channelTitle}</p>
                                        <ul>
                                            {playlists.map((playlist) => (
                                                <li key={playlist.id}>
                                                    {playlist.name}
                                                    <button onClick={() => handleAddClick(playlist.id, result)}>추가</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;