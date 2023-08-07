import React, {useState} from "react";
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

function PlayList(){
    const [addedTracks,setAddedTracks] = useState([])

    return (
        <div className="listContainers"> 
            <input className="playlistName" type='text' placeholder="Name Your Playlist"/>
            <TrackList tracks={addedTracks}/>
            <button className="add">Add To Spotify</button>
        </div>
    )
}

export default PlayList