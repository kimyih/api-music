import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcRating, FcPlus, FcApproval } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa"; // 아이콘 추가

const Header = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [playlistCount, setPlaylistCount] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [editingName, setEditingName] = useState("");

  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImg") ||
      "https://i.pinimg.com/736x/d5/93/56/d593562ea65402e843590d8c1974126b.jpg"
  );
  const [profileName, setProfileName] = useState(
    localStorage.getItem("profileName") || "김이현 ✨"
  );
  const [profileMemo, setProfileMemo] = useState(
    localStorage.getItem("profileMemo") || "내가 좋아하는 음악들 🫧"
  );

  useEffect(() => {
    const count = localStorage.getItem("playlistCount") || 0;
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
    if (newItem.trim() !== "") {
      const newCount = playlistCount + 1;
      const playlistKey = `playlist${newCount}`;
      const newPlaylist = {
        id: playlistKey,
        name: newItem,
        items: [],
      };

      localStorage.setItem(playlistKey, JSON.stringify(newPlaylist));
      localStorage.setItem("playlistCount", newCount.toString());
      setPlaylistCount(newCount);
      setPlaylists([...playlists, newPlaylist]);
      setNewItem("");
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
    if (editingName.trim() !== "") {
      const updatedPlaylists = playlists.map((playlist) =>
        playlist.id === editingPlaylist
          ? { ...playlist, name: editingName }
          : playlist
      );
      setPlaylists(updatedPlaylists);
      localStorage.setItem(
        editingPlaylist,
        JSON.stringify(
          updatedPlaylists.find((playlist) => playlist.id === editingPlaylist)
        )
      );
      setEditingPlaylist(null);
      setEditingName("");
      alert("수정이 완료되었습니다");
    }
  };

  const handleDeleteClick = (playlistId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedPlaylists = playlists.filter(
        (playlist) => playlist.id !== playlistId
      );
      setPlaylists(updatedPlaylists);
      localStorage.removeItem(playlistId);
      localStorage.setItem("playlistCount", (playlistCount - 1).toString());
      setPlaylistCount(playlistCount - 1);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
        localStorage.setItem("profileImg", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
    localStorage.setItem("profileName", e.target.value);
  };

  const handleProfileMemoChange = (e) => {
    setProfileMemo(e.target.value);
    localStorage.setItem("profileMemo", e.target.value);
  };

  return (
    <header id="header" role="banner">
      <h1 className="logo">
        <Link to="/">2y Chart</Link>
      </h1>
      <div className="Profile">
        <div className="profile__img">
          <img src={profileImg} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImgChange}
            style={{ display: "none" }}
            id="profile-img-upload"
          />
          <label
            htmlFor="profile-img-upload"
            className="profile-img-upload-label"
          >
            이미지 변경
          </label>
        </div>
        <div className="profile__name">
          <input
            type="text"
            value={profileName}
            onChange={handleProfileNameChange}
          />
        </div>
        <div className="profile__memo">
          <textarea value={profileMemo} onChange={handleProfileMemoChange} />
        </div>
      </div>
      <h2>chart</h2>
      <ul>
        <li>
          <Link to="chart/melon">
            <span className="icon"></span>멜론 챠트
          </Link>
        </li>
        <li>
          <Link to="chart/bugs">
            <span className="icon"></span>벅스 챠트
          </Link>
        </li>
        <li>
          <Link to="chart/apple">
            <span className="icon"></span>애플 챠트
          </Link>
        </li>
        <li>
          <Link to="chart/genie">
            <span className="icon"></span>지니 챠트
          </Link>
        </li>
        <li>
          <Link to="chart/billboard">
            <span className="icon"></span>빌보드 챠트
          </Link>
        </li>
      </ul>
      <h2>playlist</h2>
      <div className="playlist-container">
        <ul>
          <li>
            <Link to="/mymusic">
              <span className="icon2">
                <FcRating />
              </span>
              Mymusic
            </Link>
          </li>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {editingPlaylist === playlist.id ? (
                <div>
                  <input
                    type="text"
                    className="edit-input"
                    value={editingName}
                    onChange={handleEditingChange}
                  />
                  <button className="add-button" onClick={handleUpdateItem}>
                    변경
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span onClick={() => handlePlaylistClick(playlist.id)}>
                    <span className="icon2">
                      <FcApproval />
                    </span>
                    {playlist.name}
                  </span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(playlist)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(playlist.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </li>
          ))}
          <li>
            {showInput ? (
              <div className="create-btn">
                <input
                  className="create-input"
                  type="text"
                  value={newItem}
                  onChange={handleInputChange}
                />
                <button className="create-add-btn" onClick={handleAddItem}>
                  추가
                </button>
              </div>
            ) : (
              <Link to="#" onClick={handleAddClick}>
                <span className="icon2">
                  <FcPlus />
                </span>
                Create
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
