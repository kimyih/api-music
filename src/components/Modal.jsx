import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, onAddToPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const count = Number(localStorage.getItem("playlistCount")) || 0;
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

  const handleAddClick = (playlistId) => {
    onAddToPlaylist(playlistId);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          <MdClose size={24} />
        </button>
        <h2>플레이리스트 선택</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.name}
              <button onClick={() => handleAddClick(playlist.id)}>추가</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
