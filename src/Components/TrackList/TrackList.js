import React from "react";
import './TrackList.css';
import Track from '../Track/Track'


function TrackList(props) {

    const renderMore = () => {
        if(props.needOffSet && props.tracks.length > 0){
            return (
                <p className="more"><a onClick={props.offSet}>More</a></p>
            )
        }
    }
    
    return(
        <div className="TrackListContainer">
            <ul className="TrackList">
            {props.tracks.map((track, index) => {
                    
                

                return (
                    <Track 
                    onAdd={props.onAdd} 
                    isRemove={props.isRemove} 
                    key={track.id} 
                    track={track} 
                    onRemove={props.onRemove}
                    />
                )
            })}
            {renderMore()}
                
            </ul>
        </div>
    )
}

export default TrackList;