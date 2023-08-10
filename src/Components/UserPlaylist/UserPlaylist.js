import React, { useState } from "react";
import './UserPlaylist.css'



function UserPlaylist () {
    const [userPlaylist,setUserPlaylist] = useState([])
    
    
    return (
        <div>
            <h2>Your Playlists</h2>
            <ul>

            </ul>
        </div>
    )
}

export default UserPlaylist