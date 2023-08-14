import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'

function SearchResults(props) {

    const renderPlaceHolder = () => {
        if(props.searchResults.length <= 0){
            return (
                <>
                    <hr></hr>
                    <div className="placeHolder">
                        <h2>Discover Tracks</h2>
                    </div>
                    <hr></hr>
                </>
                
            )
        }
    }
    
    return(
        <>
            <div className="resultsContianer">
                    {renderPlaceHolder()}
                    <TrackList needOffSet={true} offSet={props.offSet} tracks={props.searchResults} onAdd={props.onAdd}/> 
            </div>
        </>
        
        
    )
}

export default SearchResults;          