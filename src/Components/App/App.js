import React, {useCallback, useEffect, useState} from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Utility/utility';
import UserPlaylist from '../UserPlaylist/UserPlaylist';

function App() {
  const [searchResults,setSearchResults] = useState([]); //this gets the object array from the API set in handleSearch
  const [playListName,setPlayListName] = useState("New Playlist");
  const [addToPlayList,setAddToPLaylist] = useState([]);
  const [userPlaylist,setUserPlaylist] = useState([]);
  
  useEffect(() => {
    Spotify.getAccessToken()
    Spotify.getUserId()
    Spotify.getUserPlaylist().then(result => {
      setUserPlaylist(result)
    })
  },[]) // gets access token and user ID also propmts login

  
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
  
  const onSave = () => {
      const trackUri = addToPlayList.map(track => track.uri);
      Spotify.savePlaylist(playListName,trackUri)
        setAddToPLaylist([]);
        setPlayListName("New Playlist");
      
  }
  

  return (
   <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={handleSearch}/>
        <section className='playlist-app'>  
          <SearchResults searchResults={searchResults} onAdd={addPlaylist}/*object array from api sent as prop to searchResults*/ />
          <div className="listContainers"> 
          {/* <PlayList 
          playListName={playListName}
          addToPlayList={addToPlayList}
          changePlaylistName={changePlaylistName}
          onRemove={removeTrack}
          onSave={onSave}
          /> */}
          <UserPlaylist userPlaylist={userPlaylist}/>
          </div>
        </section>
      </div>
   </div>
  );
}

export default App;