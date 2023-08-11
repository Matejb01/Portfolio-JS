const allFieldsEntered = (cost, tip, numberOfPeople) => {
    const hasCostValue = cost.value.length > 0;
    const hasTipValue = tip.value.length > 0;
    const hasNumberOfPeopleValue = numberOfPeople.value.length > 0;
    return hasCostValue && hasTipValue && hasNumberOfPeopleValue;
}

const setSplitAmount = (cost, tip, numberOfPeople) => {
    const c = parseFloat(cost.value);
    const t = parseFloat(tip.value) / 100;
    const n = parseFloat(numberOfPeople.value);
    const total = (c + c * t) / n;
    const pay = getById("pay");
    pay.innerText = "$" + total.toFixed(2);
}

const cost = getById("cost");
const tip = getById("tip");
const numberOfPeople = getById("numberOfPeople");

const valueOfCost = cost.value;

const calculateTip = () => {
    const cost = getById("cost");
    const tip = getById("tip");
    const numberOfPeople = getById("numberOfPeople");

    const hasAllFields = allFieldsEntered(cost, tip, numberOfPeople);
    if(hasAllFields){
        setSplitAmount(cost, tip, numberOfPeople);
    }
}