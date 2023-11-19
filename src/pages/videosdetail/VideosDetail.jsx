import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import "./videodetail.css";

const VideosDetail = () => {
    const { keyword } = useParams();

    const {
        isLoading,
        error,
        data: repoData,
    } = useQuery({
        queryKey: ["repoData", keyword],
        queryFn: () =>
            axios
                .get("https://www.googleapis.com/youtube/v3/search", {
                    params: {
                        part: "snippet",
                        maxResults: 20,
                        q: keyword,
                        type: "video",
                        key: process.env.REACT_APP_YOUTUBE_API,
                    },
                })
                .then((res) => res.data.items)
                .catch((err) => console.log(err, "error")),
    });
    register("ko", koLocale);

    if (isLoading) {
        return <p>...isLoading</p>;
    }

    if (error) {
        return <p>...error</p>;
    }
    return (
        <div>
            <ul className="videodetail">
                {repoData.map((item) => (
                    <li>
                        <div className="videodetail-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                className="video-player"
                            />
                        </div>

                        <div className="videodetail-text">
                            <img
                                src={item.snippet.thumbnails.default.url}
                                alt={item.snippet.title}
                            ></img>
                            <div>
                                <p>{item.snippet.title}</p>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{format(item.snippet.publishedAt, "ko")}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideosDetail;