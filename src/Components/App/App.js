import React, {useCallback, useEffect, useState} from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Utility/utility';
import UserPlaylist from '../UserPlaylist/UserPlaylist';
import CustomizePlaylist from '../CustomizePlaylist/CustomizePlaylist';

function App() {
  const [searchResults,setSearchResults] = useState([]); //this gets the object array from the API set in handleSearch
  const [playListName,setPlayListName] = useState("New Playlist");
  const [addToPlayList,setAddToPLaylist] = useState([]);
  const [userPlaylist,setUserPlaylist] = useState([]);
  // const [refreshPlaylist, setRefreshPlaylist] = useState(false);
  const [openPlaylistCreator, setOpenPlaylistCreator] = useState(false);
  const [customizePlaylistTracks,setCustomizePlaylistTracks] = useState([])
  const [openCustomization,setOpenCustomization] = useState(false);
  const [customPlaylistName,setCustomPlaylistName] = useState('');
  
  useEffect(() => {
    Spotify.getUserPlaylist().then(result => {
      setUserPlaylist(result)
    })
  },[]) // gets access token and user ID also propmts login

  const refreshPlaylist = () => {
    Spotify.getUserPlaylist().then(result => {
      setUserPlaylist(result)
    })
  }
  
  const customizeTracks = async (tracks) => {
    setCustomPlaylistName(tracks.name)
    const playlistTracks = await Spotify.getPlayListSongs(tracks.id);
    setCustomizePlaylistTracks(playlistTracks) 
    setOpenCustomization(true)
    setOpenPlaylistCreator(false)
  }

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
  
  const createPlaylist = () => {
    setOpenPlaylistCreator(!openPlaylistCreator)
    setOpenCustomization(false)
  }

  return (
   <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <section className='playlist-app'>  
          
          <div className="listContainers"> 
          <UserPlaylist 
            refresh={refreshPlaylist} 
            createPlaylist={createPlaylist} 
            userPlaylist={userPlaylist}
            customizeTracks={customizeTracks}
          />
          
          </div>
          {(openPlaylistCreator || openCustomization) && 
          <div className='listContainers'>
            {openPlaylistCreator && <PlayList 
            playListName={playListName}
            addToPlayList={addToPlayList}
            changePlaylistName={changePlaylistName}
            onRemove={removeTrack}
            onSave={onSave}
            />}
            {openCustomization && <CustomizePlaylist playlistName={customPlaylistName} playlistTracks={customizePlaylistTracks}/>} 
            <SearchBar onSearch={handleSearch}/>
            <SearchResults searchResults={searchResults} onAdd={addPlaylist} />
          </div>}
          
        </section>
      </div>
   </div>
  );
}

export default App;