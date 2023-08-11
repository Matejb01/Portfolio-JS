const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const upperCaseLetters = "upperCaseLetters";
const lowerCaseLetters = "lowerCaseLetters";
const passwordNumbers = "passwordNumbers";
const specialCharacters = "specialCharacters";
const allNumbers = "123456789";
const allSpecialCharacters = "!@#$%^&*()";
const upperCheckBoxId = "upperCaseLettersCheckbox";
const lowerCheckBoxId = "lowerCaseLettersCheckbox";
const numsCheckBoxId = "passwordNumbersCheckbox";
const specialCharsCheckBoxId = "specialCharactersCheckbox";

const getAllFields = () => {
    return {
        upperCaseLetters: getById(upperCaseLetters),
        lowerCaseLetters: getById(lowerCaseLetters),
        passwordNumbers: getById(passwordNumbers),
        specialCharacters: getById(specialCharacters)
    }
}

const setTextOfGenerator = () => {
    for(let key in allFields){
        const element = allFields[key];
        if(key === upperCaseLetters){
            // set the uppercase letters
            element.innerText = upperCase;
        } else if(key === lowerCaseLetters){
            // sett the lowercase letters
            element.innerText = upperCase.toLowerCase();
        } else if(key === passwordNumbers){
            // set the numbers
            element.innerText = allNumbers;
        } else {
            // set the special characters
            element.innerText = allSpecialCharacters;
        }
    }
}

const getRandomCharacters = (array, rc="") => {
    let randomCharacters = rc;
    array.forEach(data => {
        if(data === upperCaseLetters){
            const char = getRandomCharFromString(upperCase);
            randomCharacters += char;
        } else if(data === lowerCaseLetters){
            const char = getRandomCharFromString(upperCase.toLowerCase());
            randomCharacters += char;
        } else if(data === passwordNumbers){
            const char = getRandomCharFromString(allNumbers);
            randomCharacters += char;
        } else {
            const char = getRandomCharFromString(allSpecialCharacters);
            randomCharacters += char;
        }
    });
    if(randomCharacters.length < 8){
        return getRandomCharacters(array, randomCharacters);
    } else {
        return randomCharacters;
    }
}

const generatePassword = () => {
    const allBoxesChecked = getCheckedBoxes();
    const passwordBtn = getById("passwordBtn");
    passwordBtn.innerText = getRandomCharacters(allBoxesChecked);
}

const getCheckedBoxes = () => {
    const upperCaseLettersCheckbox = getById(upperCheckBoxId);
    const lowerCaseLettersCheckbox = getById(lowerCheckBoxId);
    const passwordNumbersCheckbox = getById(numsCheckBoxId);
    const specialCharactersCheckbox = getById(specialCharsCheckBoxId);

    const upperIsChecked = upperCaseLettersCheckbox.checked;
    const lowerIsChecked = lowerCaseLettersCheckbox.checked;
    const numsIsChecked = passwordNumbersCheckbox.checked;
    const charIsChecked = specialCharactersCheckbox.checked;

    const allCheckedValues = [];
    if(upperIsChecked){
        allCheckedValues.push(upperCaseLetters);
    }
    if(lowerIsChecked){
        allCheckedValues.push(lowerCaseLetters);
    }
    if(numsIsChecked){
        allCheckedValues.push(passwordNumbers)
    }
    if(charIsChecked){
        allCheckedValues.push(specialCharacters)
    }
    return allCheckedValues;
}

const copyPassword = () => {
    const passwordBtn = getById("passwordBtn").innerText;
    navigator.clipboard.writeText(passwordBtn).then(() => {
        getById("passwordBtn").innerText = "Copied!";
        setTimeout(() => {
            getById("passwordBtn").innerText = passwordBtn;
        }, 2000);
    }).catch(err => {
        console.log(err);
    })
}

const setPasswordOptions = () => {
    const allFields = getAllFields();
    setTextOfGenerator(allFields);
}

setPasswordOptions();