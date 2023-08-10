import React, { useState } from "react";
import './DisplayPlaylist.css';
import Track from "../Track/Track";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Spotify from "../../Utility/utility";

function DisplayPlaylist (props) {
    const [playlistTracks,setPlaylistTracks] = useState([]) 
    const [clicked,setClicked] = useState(true);
    const [drop,setDrop] = useState(false);
    
    const getPlaylistTracks = async () => {
        const tracksObj = await Spotify.getPlayListSongs(props.playlist.id)
        setPlaylistTracks(tracksObj)
    }

    const handleClick = (e)=> {
        getPlaylistTracks()
        
        const button = e.target
        if(clicked){
            button.classList.add('active')
            setClicked(false)
            setDrop(true)
        } else {
            setClicked(true)
            button.classList.remove('active')
            setDrop(false)
        }
    }


    return (
        <>
            <div className="trackContainer">
                <img src={props.playlist.img} className="albumCover"/>
                <h3>{props.playlist.name}</h3>
                <p>{props.playlist.numOfTracks} Tracks</p>
                <button className="caret btn" onClick={handleClick}/>
            </div>
            <DropDownMenu playlistTracks={playlistTracks} drop={drop}/>
        </>
       
    )
}

export default DisplayPlaylist 
