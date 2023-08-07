import React from "react";
import './TrackList.css';
import Track from '../Track/Track'


function TrackList(props) {

    
    return(
        <div className="TrackListContainer">
            <ul className="TrackList">
            {props.tracks.map(track => {
                return (
                    <Track key={track.id} track={track.track} artist={track.artist} album={track.album}/>
                )
            })}
                
                
            </ul>
        </div>
    )
}

export default TrackList;