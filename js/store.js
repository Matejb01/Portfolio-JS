let apiKey;

let numProductsOnShelf;

let isUpdating = false;

let updatingId;

let updatingObj;

const populateShelf = products => {
    getById("pricedItems").innerHTML = "";
    products.forEach(data => {
        const div = getParentElement();
        const productDiv = getProductElement(data);
        const update = getUpdateBtn(data);
        const deleteBtn = getDeleteBtn(data);

        div.appendChild(productDiv);
        div.appendChild(update);
        div.appendChild(deleteBtn);

        getById("pricedItems").appendChild(div);
    });
}

const getParentElement = () => {
    const div = document.createElement("div");
    div.classList.add("quarterWidth", "flexCol");
    return div;
}

const getProductElement = data => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "fullSize");
    const price = document.createElement("span");
    price.classList.add("redText", "priceText");
    price.innerText = `$${parseFloat(data.cost).toFixed(2)}`;
    const product = document.createElement("div");
    product.classList.add("shelfedProduct");
    product.style.backgroundImage = `url(${data.image})`;
    productDiv.appendChild(price);
    productDiv.appendChild(product);
    return productDiv;
}

const getUpdateBtn = product => {
    const update = document.createElement("div");
    update.classList.add("btn");
    update.innerText = "Update";
    update.onclick = () => updateProduct(product);
    return update;
}

const getDeleteBtn = product => {
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteItem(product._id);
    return deleteBtn;
}

const updateProduct = product => {
    showPriceContainer(product.image);
    isUpdating = true;
    updatingId = product._id;
    updatingObj = product;
}

const deleteItem = id => {
    fetch(getUrl(id), {
        method: "DELETE"
    }).then(data => {
        console.log("item deleted");
        loadStore();
    }).catch(err => console.log(err));
}

const getUrl = (id="") => {
    return `https://crudcrud.com/api/${apiKey}/store/${id}`;
}

const hideElementById = id => {
    getById(id).classList.add("displayNone");
}

const showElementById = id => {
    getById(id).classList.remove("displayNone");
}

const setHelpText = text => {
    getById("productHelpText").innerText = text;
}

const onAdd = () => {
    const value = getById("selectedPrice").value;
    const bgImage = getById("selectedProduct").style.backgroundImage;
    const bgImageArray = bgImage.split('"');
    if(!isUpdating){
        fetch(getUrl(), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cost: value,
                image: bgImageArray[1]
            })
        }).then(data => {
            data.json().then(item => {
                loadStore();
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    } else {
        const body = {
            ...updatingObj,
            cost: value
        }
        delete body._id;
        fetch(getUrl(updatingId), {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(data => {
            isUpdating = false;
            loadStore();
        }).catch(err => console.log(err));
    }
    
}

const showPriceContainer = item => {
    hideElementById("itemSelection");
    setHelpText("Set Price of Product");
    showElementById("setPriceContainer");
    if(item.indexOf("assets") === -1){
        getById("selectedProduct").style.backgroundImage = `url(./assets/${item}.png)`;
    } else {
        getById("selectedProduct").style.backgroundImage = `url(${item})`;
    }
}

const choiceProduct = item => {
    if(numProductsOnShelf === 4){
        return setHelpText("Shelf is full");
    }
    showPriceContainer(item);
}

const fetchItems = () => {
    fetch(getUrl()).then(data => {
        data.json().then(items => {
            numProductsOnShelf = items.length;
            populateShelf(items);
            hideElementById("setPriceContainer");
            hideElementById("loadStore");
            showElementById("itemSelection");
            setHelpText("Select a product");
        }).catch(err => console.log(err));
    }).catch(err => console.log(err))
}

const loadStore = () => {
    apiKey = document.getElementById("crudKey").value;
    if(apiKey.length){
        fetchItems();
    }
}