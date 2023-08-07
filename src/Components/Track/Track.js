import React from "react";
import './Track.css'

function Track(props){
    return(
        <li className="trackContainer">
            <h3>{props.track}</h3>
            <p>{`${props.artist} | ${props.album}`}</p>
        </li>
    )
}

export default Track;