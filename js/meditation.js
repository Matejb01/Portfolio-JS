const displayNone = "displayNone";
const meditationStrings = {
    meditationDirections: "meditationDirections",
    meditationStart: "meditationStart",
    breatheIn: "breatheIn",
    breatheOut: "breatheOut"
};

const resetMeditation = () => {
    getById(meditationStrings.breatheOut).classList.add(displayNone);
    getById(meditationStrings.meditationStart).classList.remove(displayNone);
}

const showBreatheIn = () => {
    getById(meditationStrings.breatheIn).classList.remove(displayNone);
    getById(meditationStrings.breatheOut).classList.add(displayNone);
}

const showBreatheOut = () => {
    getById(meditationStrings.breatheIn).classList.add(displayNone);
    getById(meditationStrings.breatheOut).classList.remove(displayNone);
}

const showArrows = () => {
    showBreatheIn();
    setTimeout(() => {
        showBreatheOut();
    }, 3000);
}

const startMeditation = () => {
    let delay = 0;
    for(let i = 0; i < 4; i++){
        setTimeout(() => {
            showArrows();
        }, delay);
        delay += 6000;
    }
    setTimeout(() => {
        resetMeditation();
    }, delay);
}

const meditationStartBtn = () => {
    getById(meditationStrings.meditationStart).classList.add(displayNone);
    getById(meditationStrings.meditationDirections).classList.remove(displayNone);
}

const meditationStart = () => {
    getById(meditationStrings.meditationDirections).classList.add(displayNone);
    startMeditation();
}