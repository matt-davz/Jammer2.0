import React, {useState, useCallback} from "react";
import './Customize.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

import Spotify from "../../Utility/utility";
import TrackList from "../TrackList/TrackList";


function Customize (props) {
    const [searchResults,setSearchResults] = useState([]); 
    
    
    const [playListName,setPlayListName] = useState("New Playlist");
    const [addToPlayList,setAddToPLaylist] = useState([]);

    const handleSearch = (term) => { //takes input from <SearchBar> and stores it in searchResearch
        Spotify.search(term).then(results => {
          setSearchResults(results) 
        })
       
    }
      


      

    
    const changePlaylistName = (name) => {
        setPlayListName(name)
    }

    const addPlaylist = useCallback((track) => {
        if(addToPlayList.some((savedTrack) => savedTrack.id === track.id)) return;
        setAddToPLaylist((prevTrack) => [track,...prevTrack])
        
      }, [addToPlayList])
    
    const removeTrack = (track) => {
        setAddToPLaylist(prevTrack => prevTrack.filter(tracks => tracks.id !== track.id ))
    }

    const onSave = useCallback(() => {
        const trackUri = addToPlayList.map(track => track.uri);
        Spotify.savePlaylist(playListName,trackUri)
          setAddToPLaylist([]);
          setPlayListName("New Playlist");
        
    }, [addToPlayList, playListName])

    if(props.custom){
        return (
            <div>
                <h2>{props.playlistName}</h2>
                <TrackList onRemove={props.remove} isRemove={true} tracks={props.playlistTracks}/>
                <div>
                    <button onClick={props.resetPlaylist}>Reset All</button>
                    <button onClick={props.saveCustomPlaylist}>Save to Spotify</button>
                </div>
                <div className="bottomCustom">
                <SearchBar onSearch={handleSearch}/>
                <SearchResults searchResults={searchResults} onAdd={props.add} />  
                </div>
            </div>
        )
    } else if(props.create){
        return (
            <div>
                <PlayList 
                playListName={playListName}
                addToPlayList={addToPlayList}
                changePlaylistName={changePlaylistName}
                onRemove={removeTrack}
                onSave={onSave}
                />
                <div className="bottomCustom">
                   <SearchBar onSearch={handleSearch}/>
                   <SearchResults searchResults={searchResults} onAdd={addPlaylist} /> 
                </div>
                
            </div>
        )
    }
}

export default Customize 

