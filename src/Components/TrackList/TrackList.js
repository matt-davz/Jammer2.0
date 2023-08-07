import React from "react";
import './TrackList.css';
import Track from '../Track/Track'


function TrackList() {
    return(
        <div className="TrackListContainer">
            <ul className="TrackList">
                <Track />
            </ul>
        </div>
    )
}

export default TrackList;