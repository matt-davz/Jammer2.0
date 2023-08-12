import React, { useCallback, useState } from "react";
import './Track.css'

function Track(props){

    const [clicked,setClicked] = useState(true);

    const addTrack = useCallback((e) => {
        
        props.onAdd(props.track)
    }, [props.onAdd, props.track])

    const removeTrack = useCallback((e) => {
        props.onRemove(props.track)
    }, [props.onAdd, props.track])

    const renderButton = () =>{
        if(props.isRemove){
            return (
                <button className="btn remove" onClick={removeTrack}></button>
            )} else if(props.isRemove === null){
                return
            }
            
        
            return (
                <button className="btn addbtn" onClick={addTrack}></button>
            )
        
    }

    const handlePlay = () => {
        let audio = document.getElementById(`audio${props.track.id}`)
        audio.volume = 0.5;
        if(clicked){
            audio.play()
            setClicked(false)
        } else {
            audio.pause()
            setClicked(true)
        }

        const volumeContainer = document.getElementById('volumeContainer');
        volumeContainer.classList.add('active')
    }

    const renderPreview = () => {
        if(props.track.preview_url === null){
            return 
        } else {
            return (
                <>
                <button className={`btn ${clicked ? 'play' : 'pause'}`} onClick={handlePlay}></button>
                <audio id={`audio${props.track.id}`} src={props.track.preview_url}/>
                </>
            )
        }
    }
    
    
    
    return(
        <div className="trackContainer">
            <div className="trackContent">
               <img className="albumCover" src={props.track.img}/>
            <li >
                
                <h3>{props.track.name}</h3>
                <p>{`${props.track.artist} | ${props.track.album}`}</p>
            </li> 
            </div>
            <div className="buttonContainer">
                {renderPreview()}
               {renderButton()} 
            </div>
        </div>
    )
}

export default Track;