import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/Chart";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({ name: "", items: [] });

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem(id)) || {
      name: "",
      items: [],
    };
    setPlaylist(storedPlaylist);
  }, [id]);

  const handleRemoveTrack = (index) => {
    const updatedPlaylist = {
      ...playlist,
      items: playlist.items.filter((_, i) => i !== index),
    };
    setPlaylist(updatedPlaylist);
    localStorage.setItem(id, JSON.stringify(updatedPlaylist));
  };

  return (
    <section id="playlist">
      {playlist.items.length > 0 ? (
        <Chart
          title={`${playlist.name} 리스트`}
          data={playlist.items}
          showCalendar={false}
          onRemoveTrack={handleRemoveTrack}
          isRemovable={true} // 삭제 버튼 활성화
        />
      ) : (
        <section className="music-chart">
          <div className="title">
            <h2> ✨ {`${playlist.name}`}</h2>
          </div>
          <div className="list">
            <ul>
              <li>아직 리스트가 없습니다. 노래를 추가해주세요!</li>
            </ul>
          </div>
        </section>
      )}
    </section>
  );
};

export default Playlist;
