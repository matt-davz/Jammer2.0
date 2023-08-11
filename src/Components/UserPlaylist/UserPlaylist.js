import React, { useState } from "react";
import './UserPlaylist.css'
import DisplayPlaylist from "../DisplayPlaylist/DIsplayPlaylist";



function UserPlaylist (props) {

   
    
    return (
        <>
        <div className="playlistHeader">
            <h2>Your Playlists</h2>
            <div className="headerRight">
                <label htmlFor="createPlaylist">Create Playlist</label>
                <button id="createPlaylist" className="btn addbtn" onClick={props.createPlaylist}></button>
                <button className="btn refresh" onClick={props.refresh}/>
            </div>
        </div>
        
        <div className="userPlaylistContianer">
            <ul>
                {props.userPlaylist.map(playlist => {
                    
                    return (
                        <DisplayPlaylist 
                        key={playlist.id}
                        playlist={playlist}
                        customizeTracks={props.customizeTracks}
                        />
                    )
                })}
            </ul>
            
        </div>
        
        </>
        
    )
}

export default UserPlaylist