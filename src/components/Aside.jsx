import React, { useContext, useEffect, useRef, useState } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";
import {
  IoMusicalNotes,
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPlay,
  IoPause,
  IoRepeat,
  IoShuffleOutline,
  IoTrash,
  IoVolumeHigh, // 볼륨 아이콘 추가
} from "react-icons/io5";
import ReactPlayer from "react-player";

const Aside = () => {
  const {
    musicData,
    currentTrackIndex,
    isPlaying,
    played,
    duration,
    playTrack,
    pauseTrack,
    nextTrack,
    prevTrack,
    updatePlayed,
    updateDuration,
    toggleShuffle,
    isShuffling,
    toggleRepeat,
    isRepeating,
    handleTrackEnd,
    removeTrackFromList,
    volume,
    setVolume, // 볼륨 상태 및 함수 사용
  } = useContext(MusicPlayerContext);

  const currentTrackRef = useRef(null);
  const playerRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    if (currentTrackRef.current) {
      currentTrackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTrackIndex]);

  if (musicData.length === 0) {
    return <aside id="aside">Loading...</aside>;
  }

  const currentTrack = musicData[currentTrackIndex];

  const handleProgress = (state) => {
    updatePlayed(state.played);
  };

  const handleDuration = (duration) => {
    updateDuration(duration);
  };

  const handleSeekChange = (event) => {
    updatePlayed(parseFloat(event.target.value));
  };

  const handleSeekMouseUp = (event) => {
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(event.target.value));
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        secs < 10 ? "0" : ""
      }${secs}`;
    } else {
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
  };

  const handleTrackEndModified = () => {
    if (isRepeating) {
      playerRef.current.seekTo(0);
      playTrack(currentTrackIndex);
    } else {
      handleTrackEnd();
    }
  };

  return (
    <aside id="aside">
      <div className="play-now">
        <h2>
          <IoMusicalNotes /> Now Playing
        </h2>
        <div className="thumb">
          <div className="img">
            {currentTrack && (
              <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currentTrack.videoID}`}
                controls={false}
                width="100%"
                height="100%"
                playing={isPlaying}
                onEnded={handleTrackEndModified}
                onProgress={handleProgress}
                onDuration={handleDuration}
                volume={volume} // 볼륨 설정
              />
            )}
          </div>
          {currentTrack && (
            <>
              <span className="title">{currentTrack.title}</span>
              <span className="artist">{currentTrack.artist}</span>
            </>
          )}
        </div>

        <div className="progress">
          <div className="progress-bar">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={played}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
          <div className="times">
            <span className="current-time">
              {formatTime(played * duration)}
            </span>
            <span className="total-time">{formatTime(duration)}</span>
          </div>
          <div className="controls">
            <span
              className={`shuffle ${isShuffling ? "active" : ""}`}
              onClick={toggleShuffle}
            >
              <IoShuffleOutline />
            </span>
            <span className="prev" onClick={prevTrack}>
              <IoPlaySkipBack />
            </span>
            <span
              className="play bg"
              onClick={
                isPlaying ? pauseTrack : () => playTrack(currentTrackIndex)
              }
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
            </span>
            <span className="next" onClick={nextTrack}>
              <IoPlaySkipForward />
            </span>
            <span
              className={`repeat ${isRepeating ? "active" : ""}`}
              onClick={toggleRepeat}
            >
              <IoRepeat />
            </span>
          </div>
        </div>

        <div className="volume">
          <IoVolumeHigh />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="play-list">
        <h3>
          <IoMusicalNotes /> Play list
        </h3>
        <ul>
          {musicData.map((track, index) => (
            <li
              key={index}
              ref={index === currentTrackIndex ? currentTrackRef : null}
              onClick={() => playTrack(index)}
              onMouseEnter={() => setActiveTrack(index)}
              onMouseLeave={() => setActiveTrack(null)}
              className={`${
                index === currentTrackIndex ? "current-track" : ""
              } ${isPlaying && index === currentTrackIndex ? "playing" : ""}`}
            >
              <span
                className="img"
                style={{ backgroundImage: `url(${track.imageURL})` }}
              ></span>
              <span className="title">{track.title}</span>
              {activeTrack === index && (
                <span
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTrackFromList(index);
                  }}
                >
                  <IoTrash />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
