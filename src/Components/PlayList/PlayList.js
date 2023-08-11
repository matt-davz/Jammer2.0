import React, {useState} from "react";
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

function PlayList(props){
    
    const handleChange = (e) => {
        props.changePlaylistName(e.target.value)
    }

    

    return (
        <div> 
            <input onChange={handleChange}  className="playlistName" defaultValue="New Playlist"/>
            <TrackList onRemove={props.onRemove} isRemove={true} tracks={props.addToPlayList}/>            
            <button onClick={props.onSave} className="add">Add To Spotify</button>
        </div>
    )
}

export default PlayList