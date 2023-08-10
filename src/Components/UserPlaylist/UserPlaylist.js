import React, { useState } from "react";
import './UserPlaylist.css'
import DisplayPlaylist from "../DisplayPlaylist/DIsplayPlaylist";



function UserPlaylist () {
    
    
    return (
        <div className="userPlaylistContianer">
            <h2>Your Playlists</h2>
            <ul>
                <DisplayPlaylist />
            </ul>
        </div>
    )
}

export default UserPlaylist