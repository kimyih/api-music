import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcRating, FcPlus, FcApproval } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";

const Header = () => {
    const [showInput, setShowInput] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [playlistCount, setPlaylistCount] = useState(0);
    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        const count = localStorage.getItem('playlistCount') || 0;
        setPlaylistCount(Number(count));

        const loadedPlaylists = [];
        for (let i = 1; i <= count; i++) {
            const playlist = localStorage.getItem(`playlist${i}`);
            if (playlist) {
                loadedPlaylists.push(JSON.parse(playlist));
            }
        }
        setPlaylists(loadedPlaylists);
    }, []);

    const handleAddClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value);
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const newCount = playlistCount + 1;
            const playlistKey = `playlist${newCount}`;
            const newPlaylist = {
                id: playlistKey,
                name: newItem,
                items: []
            };

            localStorage.setItem(playlistKey, JSON.stringify(newPlaylist));
            localStorage.setItem('playlistCount', newCount.toString());
            setPlaylistCount(newCount);
            setPlaylists([...playlists, newPlaylist]);
            setNewItem('');
            setShowInput(false);
        }
    };

    const handleEditClick = (playlist) => {
        setEditingPlaylist(playlist.id);
        setEditingName(playlist.name);
    };

    const handleEditingChange = (e) => {
        setEditingName(e.target.value);
    };

    const handleUpdateItem = () => {
        if (editingName.trim() !== '') {
            const updatedPlaylists = playlists.map(playlist => 
                playlist.id === editingPlaylist ? { ...playlist, name: editingName } : playlist
            );
            setPlaylists(updatedPlaylists);
            localStorage.setItem(editingPlaylist, JSON.stringify(updatedPlaylists.find(playlist => playlist.id === editingPlaylist)));
            setEditingPlaylist(null);
            setEditingName('');
            alert('수정이 완료되었습니다');
        }
    };

    const handleDeleteClick = (playlistId) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
            setPlaylists(updatedPlaylists);
            localStorage.removeItem(playlistId);
            localStorage.setItem('playlistCount', (playlistCount - 1).toString());
            setPlaylistCount(playlistCount - 1);
        }
    };

    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><IoMusicalNotes />나의 뮤직 챠트</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                <li><Link to='chart/melon'><span className='icon'></span>멜론 챠트</Link></li>
                <li><Link to='chart/bugs'><span className='icon'></span>벅스 챠트</Link></li>
                <li><Link to='chart/apple'><span className='icon'></span>애플 챠트</Link></li>
                <li><Link to='chart/genie'><span className='icon'></span>지니 챠트</Link></li>
                <li><Link to='chart/billboard'><span className='icon'></span>빌보드 챠트</Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>Mymusic</Link></li>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        {editingPlaylist === playlist.id ? (
                            <div>
                                <input
                                    type='text'
                                    className='edit-input'
                                    value={editingName}
                                    onChange={handleEditingChange}
                                />
                                <button className='add-button' onClick={handleUpdateItem}>Update</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to={`/playlist/${playlist.id}`}><span className='icon2'><FcApproval /></span>{playlist.name}</Link>
                                <button className='edit-button' onClick={() => handleEditClick(playlist)}>Edit</button>
                                <button className='delete-button' onClick={() => handleDeleteClick(playlist.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
                <li>
                    {showInput ? (
                        <div>
                            <input
                                type='text'
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddItem}>Add</button>
                        </div>
                    ) : (
                        <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>Create</Link>
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Header;
