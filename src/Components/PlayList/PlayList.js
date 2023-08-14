import React, {useState} from "react";
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

function PlayList(props){
    
    const handleChange = (e) => {
        props.changePlaylistName(e.target.value)
    }

    const renderPlaceHolder = () => {
        if(props.addToPlayList.length <= 0){
            return (
                <div className="placeHolder">
                    <h2>Add Tracks</h2>
                </div>
            )
        }
    }

    return (
        <div> 
            <div className="playlistHeader">
               <input onChange={handleChange}  className="playlistName" defaultValue="New Playlist"/>
               <button onClick={props.onSave} className="add">Add To Spotify</button> 
            </div>
            
            {renderPlaceHolder()}
            <TrackList onRemove={props.onRemove} isRemove={true} tracks={props.addToPlayList}/> 
            <hr></hr>           
        </div>
    )
}

export default PlayList