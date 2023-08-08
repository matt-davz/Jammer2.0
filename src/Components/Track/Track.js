import React, { useCallback } from "react";
import './Track.css'

function Track(props){

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
            )}
            
        
            return (
                <button className="btn addbtn" onClick={addTrack}></button>
            )
        
    }

    

    return(
        <div className="trackContainer">
            <li >
                <h3>{props.track.track}</h3>
                <p>{`${props.track.artist} | ${props.track.album}`}</p>
            </li>
            <div>
               {renderButton()} 
            </div>
        </div>
    )
}

export default Track;