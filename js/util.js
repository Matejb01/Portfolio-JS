const offscreen = "offscreen";

const hasAttribute = (ele, attr) => {
    const hasAttr = ele.hasAttribute(attr);
    return hasAttr
}

const removeAttribute = (ele, attr) => {
    ele.removeAttribute(attr);
}

const addAttribute = (ele, attr, value) => {
    const v = value || "";
    ele.setAttribute(attr, v);
}

const toggleAttribute = (ele, attr, value) => {
    const hasAttr = hasAttribute(ele, attr);
    if(hasAttr){
        removeAttribute(ele, attr);
    } else {
        addAttribute(ele, attr, value);
    }
}

const getById = id => {
    const ele = document.getElementById(id);
    return ele;
}

const getRandomIndexFromArray = array => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const getRandomCharFromString = string => {
    const index = Math.floor(Math.random() * string.length);
    return string[index];
}

const setAttr = (ele, attr, value="") => {
    ele.setAttribute(attr, value);
}

const removeAttr = (ele, attr) => {
    ele.removeAttribute(attr);
}

const addClass = (ele, className) => {
    ele.classList.add(className);
}

const removeClass = (ele, className) => {
    ele.classList.remove(className);
}
