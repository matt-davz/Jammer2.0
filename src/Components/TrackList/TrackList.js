import React from "react";
import './TrackList.css';
import Track from '../Track/Track'


function TrackList(props) {
    
    return(
        <div className="TrackListContainer">
            <ul className="TrackList">
            {props.tracks.map(track => {
                return (
                    <Track 
                    onAdd={props.onAdd} 
                    isRemove={props.isRemove} 
                    key={track.id} 
                    track={track} 
                    onRemove={props.onRemove}
                    />
                )
            })}
                
                
            </ul>
        </div>
    )
}

export default TrackList;