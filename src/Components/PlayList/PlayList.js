import React from "react";
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

function PlayList(){
    return (
        <div className="listContainers"> 
            <input className="playlistName" type='text' placeholder="Name Your Playlist"/>
            <TrackList />
            <button className="add">Add To Spotify</button>
        </div>
    )
}

export default PlayList