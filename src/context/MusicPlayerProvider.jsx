import React, { createContext, useEffect, useState } from "react";

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
  const [musicData, setMusicData] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setPlayed(0);
  };

  const playTrackFromHome = (track) => {
    setCurrentTrackIndex(0);
    setIsPlaying(true);
    setPlayed(0);
  };

  const addTrackToList = (track) => {
    setMusicData((prevMusicData) => [track, ...prevMusicData]);
  };

  const addTrackToEnd = (track) => {
    setMusicData((prevMusicData) => [...prevMusicData, track]);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (isShuffling) {
      setCurrentTrackIndex(Math.floor(Math.random() * musicData.length));
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
    }
    setIsPlaying(true);
    setPlayed(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length
    );
    setIsPlaying(true);
    setPlayed(0);
  };

  const updatePlayed = (played) => {
    setPlayed(played);
  };

  const updateDuration = (duration) => {
    setDuration(duration);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const handleTrackEnd = () => {
    if (isRepeating) {
      setPlayed(0);
      setIsPlaying(true);
    } else {
      nextTrack();
    }
  };

  const removeTrackFromList = (index) => {
    setMusicData((prevMusicData) =>
      prevMusicData.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/yih.json");
        const data = await response.json();
        setMusicData(data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };
    fetchData();
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        musicData,
        currentTrackIndex,
        isPlaying,
        played,
        duration,
        playTrack,
        playTrackFromHome,
        addTrackToList,
        addTrackToEnd,
        pauseTrack,
        nextTrack,
        prevTrack,
        updatePlayed,
        updateDuration,
        toggleShuffle,
        toggleRepeat,
        handleTrackEnd,
        isRepeating,
        isShuffling,
        removeTrackFromList,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
