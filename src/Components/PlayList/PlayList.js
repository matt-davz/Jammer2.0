import React, {useState} from "react";
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

function PlayList(props){
    
    const handleChange = (e) => {
        props.changePlaylistName(e.target.value)
    }

    const handleChangeID = (e) => {
        props.userIdChange(e.target.value)
    }

    const handleSave = () => {
      props.onSave(document.getElementById('userId').value)
    }

    return (
        <div className="listContainers"> 
            <input onChange={handleChange}  className="playlistName" defaultValue="New Playlist"/>
            <TrackList onRemove={props.onRemove} isRemove={true} tracks={props.addToPlayList}/>            <button onClick={handleSave} className="add">Add To Spotify</button>
        </div>
    )
}

export default PlayList