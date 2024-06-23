import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        maxResults: 12, // 가져올 추천 영상 수
                        q: '플레이리스트', // 추천 영상 검색 키워드
                        type: 'video',
                        key: 'AIzaSyC_9paGhSpgsO2dkNhB5uzHpRhGoXiINr4', // 여기에 유튜브 API 키를 입력하세요
                    },
                });
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <h1>추천 영상</h1>
            <div className="video-list">
                {videos.map((video) => (
                    <div key={video.id.videoId} className="video-item">
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                            <h3>{video.snippet.title}</h3>
                        </a>
                        <p>{video.snippet.channelTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
