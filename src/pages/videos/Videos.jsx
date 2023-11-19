import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import  './videos.css'
const Videos = () => {
    const [list, setList] = useState([]);
    const KEY = process.env.REACT_APP_YOUTUBE_API;
    const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=20&videoCategoryId=0&key=${KEY}`;

    useEffect(() => {
        axios
            .get(URL)
            .then((res) => setList(res.data.items))
            .catch((err) => console.log(err, "Err"));
    }, [URL]);
    register("ko", koLocale);

    return (
        <div>
            <ul className="video">
                {list.map((item, index) => (
                    <li key={index}>
                        <Link to={`/videos/explanation/${item.id}`}>
                            <div className="video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${item.id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    className="video-player"
                                />
                            </div>
                            <div className="video-text">
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
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Videos;