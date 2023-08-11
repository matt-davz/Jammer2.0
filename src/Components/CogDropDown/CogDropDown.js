import React from "react";
import "./CogDropDown.css";

function CogDropDown (props) {
    
       return (
       <div className="cogDropDown">
        <button onClick={props.customizePlaylist} className="dropDownBtn"  ><p>Customize Playlist</p></button>
    </div> 
    ) 
    
    
    
    
}

export default CogDropDown