import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { playTrackFromHome, addTrackToList } = useContext(MusicPlayerContext);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 12,
              q: "플레이리스트",
              type: "video",
              key: "AIzaSyC_9paGhSpgsO2dkNhB5uzHpRhGoXiINr4",
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.medium.url,
      artist: video.snippet.channelTitle,
    };
    addTrackToList(newTrack);
    playTrackFromHome(newTrack);
  };

  return (
    <div>
      <h1>추천 영상</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="video-item"
            onClick={() => handleVideoClick(video)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
