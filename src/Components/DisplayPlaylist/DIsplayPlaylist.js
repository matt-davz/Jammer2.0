import React, { useRef, useState } from "react";
import './DisplayPlaylist.css';
import Track from "../Track/Track";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Spotify from "../../Utility/utility";
import CogDropDown from "../CogDropDown/CogDropDown";

function DisplayPlaylist (props) {
    const [playlistTracks,setPlaylistTracks] = useState([]) 
    const [clicked,setClicked] = useState(true);
    const [dropTracks,setDropTracks] = useState(false);
    const [cogClicked,setCogClicked] = useState(false)
    
    const cogRef = useRef();
    const cogDropDown = useRef();


    const getPlaylistTracks = async () => {
        const tracksObj = await Spotify.getPlayListSongs(props.playlist.id)
        setPlaylistTracks(tracksObj)
    }

    const handleCaret = (e)=> {
        getPlaylistTracks()
        
        const button = e.target
        if(clicked){
            button.classList.add('active')
            setClicked(false)
            setDropTracks(true)
        } else {
            setClicked(true)
            button.classList.remove('active')
            setDropTracks(false)
        }
    }

    const handleCog = (e) => {
        if(cogClicked){
            setCogClicked(false)
            
        } else {
            setCogClicked(true)
            
        }
    }

    window.addEventListener('click', (e) => {
        if(e.target !== cogRef.current){
            setCogClicked(false)
        }
    })


    return (
        <div className="displayPlaylist">
<div className="trackContainer">
                <img src={props.playlist.img} className="albumCover"/>
                <h3>{props.playlist.name}</h3>
                <p>{props.playlist.numOfTracks} Tracks</p>
                <button className="caret btn" onClick={handleCaret}/>
                <button ref={cogRef} className="cog btn" onClick={() => setCogClicked(!cogClicked)} />
                {cogClicked && <CogDropDown ref={cogDropDown} cogClicked={cogClicked} />}
            </div>
            <DropDownMenu playlistTracks={playlistTracks} drop={dropTracks}/>
            
        </div>
            
       
    )
}

export default DisplayPlaylist 
