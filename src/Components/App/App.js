import React, {useCallback, useEffect, useState} from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';

const mockObj = [ 
  {
    id:1,
    track:"Wriggle",
    artist:"Cosmo Waldrek",
    album:"Wriggle Delux"
  },
  {
    id:2,
    track:"Light of Day",
    artist:"ODESZA",
    album:"ODESZA FINAL"
  },
  {
    id:3,
    track:"7 Years Old",
    artist:"Luke Graham",
    album:"7 Years Old Deluxe"
  },
  {
    id:4,
    track:"Drop It Like Its Hot",
    artist:"Snoop Dawg",
    album:"Str8 Outta Compt"
  },
  {
    id:5,
    track:"Drop It Like Its Hot",
    artist:"Snoop Dawg",
    album:"Str8 Outta Compt"
  }
]

function App() {
  const [searchResults,setSearchResults] = useState(mockObj) //this gets the object array from the API set in handleSearch
  const [playListName,setPlayListName] = useState("New Playlist")
  const [addToPlayList,setAddToPLaylist] = useState([])
  const handleSearch = (term) => { //takes input from <SearchBar> and stores it in searchResearch
    // spotify api .term.then(setSearchResults) ------!
    setSearchResults(mockObj)
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
  
  const onSave = (tracks) => {

  }
  

  return (
   <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={handleSearch}/>
        <section className='playlist-app'>  
          <SearchResults searchResults={searchResults} onAdd={addPlaylist}/*object array from api sent as prop to searchResults*/ />
          <PlayList 
          playListName={playListName}
          addToPlayList={addToPlayList}
          changePlaylistName={changePlaylistName}
          onRemove={removeTrack}
          onSave={onSave}
          />
        </section>
      </div>
   </div>
  );
}

export default App;