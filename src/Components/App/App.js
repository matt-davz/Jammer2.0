import React, {useCallback, useEffect, useState} from 'react'
import './App.css';
import Spotify from '../../Utility/utility';
import UserPlaylist from '../UserPlaylist/UserPlaylist';
import Customize from '../Customize/Customize';
import Volume from '../Volume/Volume';


function App() {
  const [searchResults,setSearchResults] = useState([]); //this gets the object array from the API set in handleSearch
  const [playListName,setPlayListName] = useState("New Playlist");
  const [addToPlayList,setAddToPLaylist] = useState([]);
  const [userPlaylist,setUserPlaylist] = useState([]);
  // const [refreshPlaylist, setRefreshPlaylist] = useState(false);
  const [openPlaylistCreator, setOpenPlaylistCreator] = useState(false);
  const [customizePlaylistTracks,setCustomizePlaylistTracks] = useState([]);
  const [openCustomization,setOpenCustomization] = useState(false);
  const [customPlaylistName,setCustomPlaylistName] = useState('');
  const [resetTracks,setResetTracks] = useState([]);
  const [customPlaylistId, setCustomPlaylistId] = useState('');
  const [playlistSnapShot,setPlaylistSnapShot] = useState('');
  const [toAdd,setToAdd] = useState([]);
  const [toRemove,setToRemove] = useState([]);
  
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
    setResetTracks(playlistTracks)
    setOpenCustomization(true)
    setOpenPlaylistCreator(false)
    setCustomPlaylistId(tracks.id)
    setPlaylistSnapShot(tracks.snapShotId)
  }

  useEffect(() => {
  }, [toRemove,toAdd])

  const addToSpotifyPlaylist = () => {
    if(toAdd.length <= 0) return
    const uris = toAdd.map(track => track.uri)
    Spotify.addSong(uris,customPlaylistId)
    setToAdd([])
  }

  const removeFromSpotifyPlaylist = () => {
    if(toRemove.length <= 0) return 
    const uris = toRemove.map(track => track.uri);
    console.log(uris)
    Spotify.removeSong(uris,customPlaylistId,playlistSnapShot)
    
  }

  const saveCustomePlaylist = async () => {
    if(toAdd.lenght<0 && toRemove.length<0){
      return
    }

    removeFromSpotifyPlaylist()
    addToSpotifyPlaylist()
  }


  const removeCustomTracks = (track) => {
    setCustomizePlaylistTracks(prevTrack => prevTrack.filter(tracks => tracks.id !== track.id))

    setToRemove(prev => [track,...prev])
  }

  const addCustomTracks = (track) => {
    if(customizePlaylistTracks.some((savedTracks => savedTracks.id === track.id))) return
    setCustomizePlaylistTracks(prev => [track,...prev])

    if(toAdd.some((savedTracks => savedTracks.id === track.id))) return
    setToAdd(prev => [track,...prev])
  }


  const resetCustomPlaylist = () => {
    setCustomizePlaylistTracks(resetTracks);
    setToAdd([]);
    setToRemove([]);
  }

  
  const createPlaylist = () => {
    setOpenPlaylistCreator(true)
    setOpenCustomization(false)
  }

  return (
    <>
    <Volume />
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
          {(openCustomization || openPlaylistCreator) && 
          
          <div id="customContainer" className='listContainers'>
            <Customize 
            remove={removeCustomTracks} 
            add={addCustomTracks}
            playlistTracks={customizePlaylistTracks} 
            playlistName={customPlaylistName} 
            custom={openCustomization} 
            saveCustomPlaylist={saveCustomePlaylist}
            resetPlaylist={resetCustomPlaylist}

            
            
            
            create={openPlaylistCreator}/>
          </div>

          }
          
        </section>
      </div>
   </div>
    </>
   
  );
}

export default App;