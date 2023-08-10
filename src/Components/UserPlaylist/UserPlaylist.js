import React, { useState } from "react";
import './UserPlaylist.css'
import DisplayPlaylist from "../DisplayPlaylist/DIsplayPlaylist";



function UserPlaylist (props) {
    
    return (
        <div className="userPlaylistContianer">
            <h2>Your Playlists</h2>
            <ul>
                {props.userPlaylist.map(playlist => {
                    
                    return (
                        <DisplayPlaylist 
                        key={playlist.id}
                        playlist={playlist}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default UserPlaylist