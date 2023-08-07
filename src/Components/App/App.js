import React, {useState} from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';

function App() {
  return (
   <div>
      <h1>Ja<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <section className='playlist-app'>  
          <SearchResults />
          <PlayList />
        </section>
      </div>
   </div>
  );
}

export default App;
