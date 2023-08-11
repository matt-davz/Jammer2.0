import React from "react";
import "./DropDownMenu";
import TrackList from "../TrackList/TrackList";

function DropDownMenu(props){
    if(props.drop){
        return (
            <div>
                <TrackList tracks={props.playlistTracks} /> 
            </div>
        )
    } else {
        return
    }
}

export default DropDownMenu