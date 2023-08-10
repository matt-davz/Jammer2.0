import React from "react";
import './DisplayPlaylist.css';
import Track from "../Track/Track";

function DisplayPlaylist (props) {
    return (
        <div className="trackContainer">
            <img src={props.playlist.img} className="albumCover"/>
            <h3>{props.playlist.name}</h3>
            <p>{props.playlist.numOfTracks} Tracks</p>
        </div>
    )
}

export default DisplayPlaylist 