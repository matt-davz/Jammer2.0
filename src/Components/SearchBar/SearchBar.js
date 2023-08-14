import React, {useState} from "react";
import './SearchBar.css';

function SearchBar(props){

    const [term ,setTerm] = useState('');
 
    const handleChange = (e) => { // adds input to term state
        setTerm(e.target.value)
    }

    const handleClick = () => { //sends search term to prop to then be used in APP for spotify api
        props.onSearch(term)
    }

    return (
        <div className="searchContainer">
            <input className="searchBar" type='text' onChange={handleChange}/>
            <button className="searchButton" onClick={handleClick}>SEARCH</button>
        </div>
    );
};

export default SearchBar;