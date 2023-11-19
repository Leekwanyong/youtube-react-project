import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { format } from "timeago.js";
import axios from "axios";
import './videoexplanation.css'

const VideoExplanation = () => {
    const { videoId } = useParams();
    const KEY = process.env.REACT_APP_YOUTUBE_API;
    const URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${KEY}&part=snippet,contentDetails,statistics,player`;

    const {
        isLoading,
        error,
        data: videoExplanation,
    } = useQuery({
        queryKey: ["videoExplanation", videoId],
        queryFn: () =>
            axios
                .get(URL)
                .then((res) => res.data.items[0])
                .catch((err) => console.log("err", err)),
    });

    if (isLoading) {
        return <p>...isLoading</p>;
    }

    if (error) {
        return <p>...error</p>;
    }
    return (
        <div>
            {videoExplanation && (
                <ul className="videosplan">
                    <li>
                        <div>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoExplanation.id}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                className="video-player2"
                                controls
                            ></iframe>
                        </div>
                        <h1>{videoExplanation.snippet.title}</h1>
                        <div className="videoplan-img">
                            <img
                                src={videoExplanation.snippet.thumbnails.default.url}
                                alt={videoExplanation.snippet.title}
                            ></img>
                            <div className="videoplan-img__text">
                                <p>{videoExplanation.snippet.title}</p>
                                <p>{videoExplanation.snippet.channelTitle}</p>
                                <p>{format(videoExplanation.snippet.publishedAt, "ko")}</p>
                            </div>
                        </div>
                        <p>{videoExplanation.snippet.localized.description}</p>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default VideoExplanation;