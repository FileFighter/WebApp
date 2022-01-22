function playAudioByID(audioID) {
    document.getElementById(audioID).play()
}

function pauseAudioByID(audioID) {
    document.getElementById(audioID).pause()
}

function setAudioVolumeByID(audioID, volume) {
    //0.0 - 1.0
    document.getElementById(audioID).volume = volume
}

function audioOnOff(audioID) {
    if (document.getElementById(audioID).paused) {
        playAudioByID(audioID)
    } else {
        pauseAudioByID(audioID)
    }
}

export { pauseAudioByID, playAudioByID, setAudioVolumeByID, audioOnOff }
