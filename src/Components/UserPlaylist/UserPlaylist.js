import React, { useState } from "react";
import './UserPlaylist.css'
import DisplayPlaylist from "../DisplayPlaylist/DIsplayPlaylist";



function UserPlaylist (props) {

   
    
    return (
        <>
        <div className="playlistHeader">
            <h2>Your Playlists</h2>
            <div className="headerRight">
                <label>Create Playlist</label>
                <button id="createPlaylist" className="btn addbtn" onClick={props.createPlaylist}></button>
            </div>
        </div>
        
        <div className="userPlaylistContianer">
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
        </>
        
    )
}

export default UserPlaylist