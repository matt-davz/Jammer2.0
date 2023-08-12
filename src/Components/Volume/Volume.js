import React, { useEffect, useState } from "react";
import './Volume.css'

function Volume (){

    const [hideClicked,setHideClicked] = useState(false)
    const [volumeVal,setVolumeVal] = useState(0.5)

    const handleChange = ({target}) => {
        setVolumeVal(target.value)
    }

    useEffect(() => {
        const audio = document.querySelectorAll('audio')
        audio.forEach(audio => {
            audio.volume = volumeVal
        })
    }, [volumeVal])

    const hide = () => {
        const volumeContainer = document.getElementById('volumeContainer');
        
            volumeContainer.classList.remove('active')
            setHideClicked(!hideClicked)
        

    }

    return (
        <div id="volumeContainer" className="volumeContainer">
            <button onClick={hide} className="btn escape" />
            <button className="speaker btn"/>
            <input type="range" min="0" max="1" step="0.01" value={volumeVal} className="volumeSlider" onChange={handleChange}/>
        </div>
    )
}

export default Volume 