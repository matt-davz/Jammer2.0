import React from "react";
import './SearchBar.css';

function SearchBar(){
    return (
        <div className="searchContainer">
            <h2>Discover a track</h2>
            <input className="searchBar" type='text'/>
            <button className="searchButton">SEARCH</button>
        </div>
    );
};

export default SearchBar;