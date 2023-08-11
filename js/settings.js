const resetScores = () => {
    const mgReset = document.getElementById("mgReset").checked;
    const wamReset = document.getElementById("wamReset").checked;
    const tttReset = document.getElementById("tttReset").checked;
    if(mgReset){
        localStorage.removeItem(mgString.mgHighScore);
    }
    if(wamReset){
        localStorage.removeItem(wamKey);
    }
    if(tttReset){
        localStorage.removeItem(tttKey);
    }
    window.location.reload();
}