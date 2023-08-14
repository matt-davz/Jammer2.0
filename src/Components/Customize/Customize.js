import React, {useState, useCallback, useEffect} from "react";
import './Customize.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

import Spotify from "../../Utility/utility";
import TrackList from "../TrackList/TrackList";


function Customize (props) {
    const [searchResults,setSearchResults] = useState([]); 
    const [moreTracks, setMoreTracks] = useState([])
    const [term,setTerm] = useState('')
    const [playListName,setPlayListName] = useState("New Playlist");
    const [addToPlayList,setAddToPLaylist] = useState([]);
    const [offSetCount,setOffSetCount] = useState(1)

    useEffect(() => { 
        if(term === '') return
        console.log('ye')
        Spotify.search(term,0).then(results => {
          setSearchResults(results) 
        })
    },[term])

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])
      

    const addMoreTracks = () => {
        if(offSetCount >= 1000) return;
        const offSet = offSetCount*20;
        setOffSetCount(prev => prev+1)
        Spotify.search(term,offSet).then(results => {
            setSearchResults(prev => [...prev,...results])
            console.log(results)
        })
    }
    
    // useEffect(() => {
    //     console.log(moreTracks)
    // }, [moreTracks])

    
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
            <div className="customContainer">

                <div className="listContainers">
                 <div className="customizeHeader">
                      <h2>{props.playlistName}</h2>
                      <div>
                         <button className="reset" onClick={props.resetPlaylist}>Reset All</button>
                        <button className="add"onClick={props.saveCustomPlaylist}>Save to Spotify</button> 
                     </div>
                 </div>
                 <TrackList onRemove={props.remove} isRemove={true} tracks={props.playlistTracks}/>
                </div>
                
                
                
                <div className="listContainers">
                 <div className="bottomCustom">
                    <SearchBar onSearch={setTerm}/>
                    <SearchResults searchResults={searchResults} onAdd={props.add} offSet={addMoreTracks}/>  
                 </div>
                </div>
            </div>
        )
    } else if(props.create){
        return (
            <div className="customContainer">
                <div className="listContainers">
                    <PlayList 
                    playListName={playListName}
                    addToPlayList={addToPlayList}
                    changePlaylistName={changePlaylistName}
                    onRemove={removeTrack}
                    onSave={onSave}
                    />
                </div>
                
                <div className="listContainers">
                    <div className="bottomCustom">
                    <SearchBar onSearch={setTerm}/>
                    <SearchResults searchResults={searchResults} onAdd={addPlaylist} offSet={addMoreTracks} /> 
                    </div>
                </div>

               
                
            </div>
        )
    }
}

export default Customize 

