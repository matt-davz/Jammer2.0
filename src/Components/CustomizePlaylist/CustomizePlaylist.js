import React, { useEffect, useState } from "react";
import './CustomizePlaylist.css'
import TrackList from "../TrackList/TrackList";
import Spotify from "../../Utility/utility";

function CustomizePlaylist(props) {

    const [playlistSongs,setPlayListSongs] = useState([]);
    
    

        

    return (
        <>
            <h2>{props.playlistName}</h2>
            
            <TrackList tracks={props.playlistTracks}/>

 


            
        </>
        
    )
}

export default CustomizePlaylist